import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Exam,
  QuestionCreateDto,
  QuestionViewDto,
  TypeQuestion,
} from 'src/app/models/exam.model';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

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
    private examService: ExamService,
    private _router: Router
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
    try {
      let exam = await this.examService.addQuestion(question, this.exam._id);
      this.exam = exam;
      this.questions = this.exam.questions;
    } catch (e) {}
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
  goToPreview() {
    if (this.exam.questions.length > 0) {
      this._router.navigate([`/preview/${this.exam._id}`]);
    } else {
      Swal.fire({
        icon: 'info', //"success" | "error" | "warning" | "info" | "question"
        title: 'Add question!',
        text: 'Please add at least one question for previewing the quiz!',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        backdrop: false,
        // timer: 1000,
        // footer: '',
      });
    }
  }
}
