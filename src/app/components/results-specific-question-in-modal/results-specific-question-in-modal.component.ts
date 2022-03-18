import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeQuestion } from 'src/app/models/exam.model';
import { Result } from 'src/app/models/result.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  }
  exportInPdf() {
    let DATA: any = document.getElementById('htmlData1');
    let date = new Date();
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(
        `Result_${this.result.student.firstName}_${this.result.student.lastName}.pdf`
      );
    });
  }
}
