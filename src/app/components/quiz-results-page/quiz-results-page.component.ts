import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Result } from 'src/app/models/result.model';
import { StorageService } from 'src/app/services/storage.service';
import { ResultsSpecificQuestionInModalComponent } from '../results-specific-question-in-modal/results-specific-question-in-modal.component';

@Component({
  selector: 'app-quiz-results-page',
  templateUrl: './quiz-results-page.component.html',
  styleUrls: ['./quiz-results-page.component.scss'],
})
export class QuizResultsPageComponent implements OnInit {
  result: Result;
  constructor(
    private storageService: StorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.result = this.storageService.getResultsFromTest();
    console.log(this.result);
  }

  reviewAnswers() {
    let dialogRef = this.dialog.open(ResultsSpecificQuestionInModalComponent, {
      height: '70%',
      width: '70%',
      data: { result: this.result },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data === 'confirmed') {
      }
    });
  }
}
