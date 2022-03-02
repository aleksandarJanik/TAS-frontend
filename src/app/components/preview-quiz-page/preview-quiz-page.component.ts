import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-preview-quiz-page',
  templateUrl: './preview-quiz-page.component.html',
  styleUrls: ['./preview-quiz-page.component.scss'],
})
export class PreviewQuizPageComponent implements OnInit {
  exam: Exam;
  constructor(
    private examService: ExamService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    let testId = this.route.snapshot.paramMap.get('id');
    this.exam = await this.examService.getExamById(testId);

    console.log(this.exam);
  }
}
