import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeQuestion } from 'src/app/models/exam.model';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-results-specific-question-in-modal',
  templateUrl: './results-specific-question-in-modal.component.html',
  styleUrls: ['./results-specific-question-in-modal.component.scss'],
})
export class ResultsSpecificQuestionInModalComponent implements OnInit {
  result: Result;
  typeQuestion = TypeQuestion;
  constructor(
    public dialogRef: MatDialogRef<ResultsSpecificQuestionInModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.result = this.data.result;
    console.log(this.result);
  }
}
