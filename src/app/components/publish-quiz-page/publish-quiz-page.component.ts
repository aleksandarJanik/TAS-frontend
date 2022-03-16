import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import {
  ChoosenQuestion,
  Exam,
  FinishedExamDto,
} from 'src/app/models/exam.model';
import {
  SaveTimeDto,
  StudentSpecialToken,
} from 'src/app/models/specialTokenStudent.model';
import { ExamService } from 'src/app/services/exam.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publish-quiz-page',
  templateUrl: './publish-quiz-page.component.html',
  styleUrls: ['./publish-quiz-page.component.scss'],
})
export class PublishQuizPageComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  // this.countdown.begin();
  token: StudentSpecialToken;
  exam: Exam;
  config = {
    demand: false,
    leftTime: 0,
    // stopTime: 12,
    format: 'mm:ss',
    notify: [1],
  };
  choosenQuestions: ChoosenQuestion[] = [];
  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private _router: Router, // private storageService: StorageService
    private _snackBar: MatSnackBar,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    try {
      this.token = await this.examService.checkToken(
        this.route.snapshot.paramMap.get('token') as string
      );
      this.exam = await this.examService.getExamToStartQuiz(
        this.token.exam,
        this.token.user
      );
      if (this.exam.hasTimeLimit) {
        let min = parseInt(this.token.time.split(':')[0]);
        let sec = parseInt(this.token.time.split(':')[1]);
        let time = min * 60 + sec;
        this.config.leftTime = time;
        if (this.token.time !== '00:00') {
          min = parseInt(this.exam.time.split(':')[0]);
          sec = parseInt(this.exam.time.split(':')[1]);
          time = min * 60 + sec;
          while (true) {
            time = time - 10;
            if (time < 1) {
              break;
            }
            this.config.notify.push(time);
          }
        }

        // this.config.notify
      }

      this.choosenQuestions = this.exam.questions.map((q) => {
        let choosenQuestion: ChoosenQuestion = {
          answers: [],
          questionId: q._id,
        };
        return choosenQuestion;
      });
    } catch (ex: any) {
      let result = await Swal.fire({
        icon: 'error', //"success" | "error" | "warning" | "info" | "question"
        title: 'Error!',
        text: ex.error.error,
        showCancelButton: false,
        confirmButtonText: 'Ok',
        backdrop: false,
        // footer: '',
      });
      if (result.isConfirmed) {
        this._router.navigate([`/login`]);
      }
    }
  }

  async handleEvent(event: any) {
    if (this.countdown !== undefined) {
      if (this.countdown.i.text !== '00:00') {
        let saveTimeDto: SaveTimeDto = {
          time: this.countdown.i.text as string,
          token: this.token._id,
        };
        await this.examService.saveTime(saveTimeDto);
      } else {
        let saveTimeDto: SaveTimeDto = {
          time: '00:00',
          token: this.token._id,
        };
        await this.examService.saveTime(saveTimeDto);
        this.submitTest();
      }
    }
  }
  addAnswer(obj: any) {
    if (obj.hasMore) {
      let choosenQuestionIndex = this.choosenQuestions.findIndex(
        (q) => q.questionId === obj.questionId + ''
      );

      let answerIndex = this.choosenQuestions[
        choosenQuestionIndex
      ].answers.findIndex((a) => a === obj.name);

      if (answerIndex === -1) {
        this.choosenQuestions[choosenQuestionIndex].answers.push(obj.name);
      } else {
        this.choosenQuestions[choosenQuestionIndex].answers.splice(
          answerIndex,
          1
        );
      }
    } else {
      let choosenQuestionIndex = this.choosenQuestions.findIndex(
        (q) => q.questionId === obj.questionId + ''
      );
      if (obj.name !== '') {
        this.choosenQuestions[choosenQuestionIndex].answers = [obj.name];
      } else {
        this.choosenQuestions[choosenQuestionIndex].answers = [];
      }
    }
    console.log(
      'this.choosenQuestions[choosenQuestionIndex]',
      this.choosenQuestions
    );
  }
  qustionClear(questionId: string) {
    let choosenQuestionIndex = this.choosenQuestions.findIndex(
      (q) => q.questionId === questionId
    );
    this.choosenQuestions[choosenQuestionIndex].answers = [];
  }

  async submitTest() {
    let finishedExamDto: FinishedExamDto = {
      questions: this.choosenQuestions,
      studentSpecialTokenId: this.token._id,
    };
    console.log('finishedExamDto: ', finishedExamDto);
    try {
      let resutls = await this.examService.finishExam(finishedExamDto);
      this.storageService.addResultsFromTest(resutls);
      if (this.exam.showResutPage) {
        this._router.navigate([`/quiz-result/${this.token._id}`]);
      } else {
        this._router.navigate([`/login`]);
      }
      this._snackBar.open('Thanks for you subbmision!', 'close', {
        duration: 2500,
      });
    } catch (e) {
      this._snackBar.open('Something bad happens', 'close', {
        duration: 2500,
      });
    }
  }
}
