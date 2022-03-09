import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionViewDto, TypeQuestion } from 'src/app/models/exam.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.scss'],
})
export class ShowQuestionComponent implements OnInit {
  @Input() question: QuestionViewDto;
  @Input() num: number;
  @Output() answerAdded: EventEmitter<any> = new EventEmitter();
  @Output() qustionClear: EventEmitter<string> = new EventEmitter();
  answers: any = [];
  typeQuestion = TypeQuestion;
  answer: any;
  obj: any = { name: '', checked: [] };
  checkboxes: any = {};
  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.answers = this.question.answers.map((a) => {
      let isCorrect = this.question.correctAnswers.some((ca) => ca === a);
      return { name: a, isCorrect: isCorrect };
    });

    if (this.question) {
      this.obj = this.storageService.getQuestionExamDto(this.question._id);
      if (this.obj !== null && this.question.type !== TypeQuestion.CHECKBOXES) {
        this.answerAdded.emit(this.obj);
        this.answer = this.obj.name;
      }
      if (this.question.type === TypeQuestion.CHECKBOXES) {
        this.checkboxes = this.storageService.getheckBoxesExamDto(
          this.question._id
        );
        console.log('checkboxes', this.checkboxes);
        if (this.checkboxes) {
          for (let a of this.question.answers) {
            this.checkboxes[a] =
              this.checkboxes[a] !== undefined ? this.checkboxes[a] : false;
            if (this.checkboxes[a] !== undefined && this.checkboxes[a]) {
              this.obj.name = a;
              this.answerAdded.emit(this.obj);
            }
          }
        } else {
          this.checkboxes = {};
          for (let a of this.question.answers) {
            this.checkboxes[a] = false;
          }
        }

        this.storageService.setCheckBoxesExamDto(
          this.question._id,
          this.checkboxes
        );

        // this.checkboxes = JSON.parse(checkboxesObj);
      }
    }
  }
  sendCheckBox(name: string) {
    this.storageService.setCheckBoxesExamDto(
      this.question._id,
      this.checkboxes
    );
  }
  addResultText(event: any) {
    let res: string = event.path[0].value.trim();

    this.obj = {
      name: res,
      questionId: this.question._id,
      hasMore: false,
    };
    this.answerAdded.emit(this.obj);
    this.storageService.setQuestionExamDto(this.question._id, this.obj);
  }
  addResult(name: string) {
    this.obj = {
      name: name,
      questionId: this.question._id,
      hasMore: false,
    };
    this.answerAdded.emit(this.obj);
    this.storageService.setQuestionExamDto(this.question._id, this.obj);
  }
  addResultCheckBox(name: string) {
    this.obj = {
      name: name,
      questionId: this.question._id,
      hasMore: true,
    };
    this.answerAdded.emit(this.obj);
    this.storageService.setQuestionExamDto(this.question._id, this.obj);
  }

  clearAnswers() {
    this.qustionClear.emit(this.question._id);
    this.answer = null;
    this.storageService.removeQuestionExamDto(this.question._id);
  }
}
