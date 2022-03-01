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
  questionHashHelper: any = {};
  correctRadioAnswer: string;
  answers: any = [];
  constructor(private examService: ExamService) {}

  async ngOnInit() {
    console.log('question: ', this.question);
    this.answers = this.question.answers.map((a) => {
      const randomString = Math.random().toString(36).slice(2);
      return {
        val: a,
        checked: false,
        radio: false,
        id: randomString,
      };
    });
    this.question.answers.forEach((option, index) => {
      const randomString = Math.random().toString(36).slice(2);
      console.log(randomString);
      this.questionHashHelper[index] = {
        name: option,
        correct: false,
      };
    });
    // this.choosenTypeQuestion = this.question.type;
  }

  async removeQuestion() {
    try {
      await this.examService.removeQuestion(this.examId, this.question._id);
      this.questionEdited.emit();
    } catch (e) {}
  }
  addOption() {
    const randomString = Math.random().toString(36).slice(2);
    this.questionHashHelper[this.question.answers.length] = {
      name: '',
      correct: false,
    };
    this.question.answers.push('');
  }

  saveQuestion() {
    let answers: string[] = this.question.answers.map((a, index) => {
      return this.questionHashHelper[index].name + '';
    });
    let correctAnswers: string[] = [];
    if (
      this.question.type + '' === TypeQuestion.RADIO + '' ||
      this.question.type + '' === TypeQuestion.DROPDOWN + ''
    ) {
      if (this.correctRadioAnswer) {
        correctAnswers.push(
          this.questionHashHelper[this.correctRadioAnswer].name
        );
      }
    } else if (this.question.type + '' === TypeQuestion.CHECKBOXES + '') {
      correctAnswers = this.question.answers
        .map((a, index) => {
          return this.questionHashHelper[index].name + '';
        })
        .filter((a, index) => this.questionHashHelper[index].correct === true);
    }

    let updateQuestionDto: QuestionCreateDto = {
      isRequired: this.question.isRequired,
      type: parseInt(this.question.type + ''),
      question: this.question.question,
      answers: answers,
      correctAnswers: correctAnswers,
    };
    console.log(updateQuestionDto);
  }

  removeAnswer(index: number) {
    let name = this.questionHashHelper[index].name;
    let answers = this.question.answers.map((option, index) => {
      return {
        name: this.questionHashHelper[index].name,
        correct: this.questionHashHelper[index].correct,
      };
    });

    answers.splice(index, 1);
    this.questionHashHelper = {};
    answers.forEach((option, index) => {
      this.questionHashHelper[index] = {
        name: option.name,
        correct: option.correct,
      };
    });
    this.question.answers = answers.map((a) => a.name);

    if (this.question.type + '' === TypeQuestion.CHECKBOXES + '') {
      let indexToRemove = this.question.correctAnswers.findIndex(
        (a) => a === name
      );
      if (indexToRemove !== -1) {
        this.question.correctAnswers.splice(indexToRemove, 1);
      }
    }
  }
  removeAnswerRadio(index: number, answe: string, questionObj: any) {
    console.log(questionObj);
  }
  radioChange(index: number) {
    this.question.answers.forEach((element, i) => {
      this.questionHashHelper[i].correctRadioAnswer = false;
    });
    this.questionHashHelper[index].correctRadioAnswer = true;
  }
}
