import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Exam,
  QuestionCreateDto,
  QuestionViewDto,
  TypeQuestion,
} from 'src/app/models/exam.model';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-create-test-page',
  templateUrl: './create-test-page.component.html',
  styleUrls: ['./create-test-page.component.scss'],
})
export class CreateTestPageComponent implements OnInit {
  exam: Exam;
  typeQuestion = TypeQuestion;
  questions: QuestionViewDto[] = [];
  description = '';
  constructor(
    private route: ActivatedRoute,
    private examService: ExamService
  ) {}

  async ngOnInit() {
    let testId = this.route.snapshot.paramMap.get('id');
    this.exam = await this.examService.getExamById(testId);
    this.questions = this.exam.questions;
    this.description = this.exam.description;
    console.log('exam: ', this.exam);
  }

  async addQuestion() {
    let question: QuestionCreateDto = {
      answers: [''],
      correctAnswers: [],
      question: '',
      type: TypeQuestion.DROPDOWN,
      isRequired: true,
    };
    let exam = await this.examService.addQuestion(question, this.exam._id);
    this.exam = exam;
    this.questions = this.exam.questions;
  }

  async saveDescription() {
    let exam = await this.examService.addDescription(
      this.exam._id,
      this.description
    );
    this.description = exam.description;
  }

  async saveTitle() {
    let exam = await this.examService.addTitle(this.exam._id, this.exam.name);
    this.exam.name = exam.name;
  }

  async questionEdited() {
    this.exam = await this.examService.getExamById(this.exam._id);
    this.questions = this.exam.questions;
  }
}
