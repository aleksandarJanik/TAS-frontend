import { Component, Input, OnInit } from '@angular/core';
import { QuestionViewDto, TypeQuestion } from 'src/app/models/exam.model';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.scss'],
})
export class ShowQuestionComponent implements OnInit {
  @Input() question: QuestionViewDto;
  answers: any = [];
  typeQuestion = TypeQuestion;
  constructor() {}

  ngOnInit(): void {
    this.answers = this.question.answers.map((a) => {
      let isCorrect = this.question.correctAnswers.some((ca) => ca === a);
      return { name: a, isCorrect: isCorrect };
    });
    console.log(this.answers);
  }
}
