import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preview-quiz-page',
  templateUrl: './preview-quiz-page.component.html',
  styleUrls: ['./preview-quiz-page.component.scss'],
})
export class PreviewQuizPageComponent implements OnInit {
  exam: Exam;
  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private _router: Router,
    private examsService: ExamService
  ) {}

  async ngOnInit() {
    let testId = this.route.snapshot.paramMap.get('id');
    this.exam = await this.examService.getExamById(testId);

    console.log(this.exam);
  }
  async goToAnalyze(exam: Exam) {
    let hasResults = await this.examsService.checkIfExamHasResults(exam._id);
    if (hasResults) {
      this._router.navigate([`/analyze/${exam._id}`]);
    } else {
      Swal.fire({
        icon: 'info', //"success" | "error" | "warning" | "info" | "question"
        title: 'No submissions found!',
        text: 'You need one submission at least to preview the results!',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        backdrop: false,
        // timer: 1000,
        // footer: '',
      });
    }
  }
}
