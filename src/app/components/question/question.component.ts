import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  QuestionCreateDto,
  QuestionViewDto,
  TypeQuestion,
} from 'src/app/models/exam.model';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question: QuestionViewDto;
  @Input() index: number;
  @Input() examId: string;
  @Output() questionEdited: EventEmitter<void> = new EventEmitter();
  typeQuestion = TypeQuestion;
  // choosenTypeQuestion = TypeQuestion.CHECKBOXES;
  // questionHashHelper: any = {};
  // correctRadioAnswer: string;
  answers: any = [];
  constructor(private examService: ExamService) {}

  async ngOnInit() {
    console.log('question: ', this.question);

    this.answers = this.question.answers.map((a) => {
      const randomString = Math.random().toString(36).slice(2);
      let checked = false;
      let radio = false;
      if (this.question.type === TypeQuestion.CHECKBOXES) {
        let index = this.question.correctAnswers.findIndex((ca) => ca === a);
        checked = index === -1 ? false : true;
      } else if (
        this.question.type === TypeQuestion.RADIO ||
        this.question.type === TypeQuestion.DROPDOWN
      ) {
        let index = this.question.correctAnswers.findIndex((ca) => ca === a);
        radio = index === -1 ? false : true;
      }
      return {
        val: a,
        checked: checked,
        radio: radio,
        id: randomString,
      };
    });
  }

  async removeQuestion() {
    try {
      await this.examService.removeQuestion(this.examId, this.question._id);
      this.questionEdited.emit();
    } catch (e) {}
  }
  addOption() {
    const randomString = Math.random().toString(36).slice(2);
    let obj = {
      val: '',
      checked: false,
      radio: false,
      id: randomString,
    };
    this.answers.push(obj);
  }

  async saveQuestion() {
    let answ: string[] = [];
    let correctAnswers: string[] = [];

    for (let a of this.answers) {
      answ.push(a.val);
      if (this.question.type + '' === TypeQuestion.CHECKBOXES + '') {
        if (a.checked) {
          correctAnswers.push(a.val);
        }
      } else if (
        this.question.type + '' === TypeQuestion.RADIO + '' ||
        this.question.type + '' === TypeQuestion.DROPDOWN + ''
      ) {
        if (a.radio) {
          correctAnswers.push(a.val);
        }
      }
    }

    let updateQuestionDto: QuestionCreateDto = {
      isRequired: this.question.isRequired,
      type: parseInt(this.question.type + ''),
      question: this.question.question,
      answers: answ,
      correctAnswers: correctAnswers,
    };
    console.log(updateQuestionDto);
    await this.examService.saveQuestion(
      updateQuestionDto,
      this.examId,
      this.question._id
    );
  }

  removeAnswer(index: number) {
    this.answers.splice(index, 1);
  }

  radioChange(index: number) {
    for (let a of this.answers) {
      a.radio = false;
    }
    this.answers[index].radio = true;
  }
}