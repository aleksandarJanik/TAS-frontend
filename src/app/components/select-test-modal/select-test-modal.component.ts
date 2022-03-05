import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exam } from 'src/app/models/exam.model';
import { Student } from 'src/app/models/student.model';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-select-test-modal',
  templateUrl: './select-test-modal.component.html',
  styleUrls: ['./select-test-modal.component.scss'],
})
export class SelectTestModalComponent implements OnInit {
  classId: string;
  presentStudents: Student[];
  exams: Exam[];
  constructor(
    public dialogRef: MatDialogRef<SelectTestModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    console.log(this.data);
    this.exams = this.data.exams;
    this.classId = this.data.classId;
    this.presentStudents = this.data.presentStudents;
  }

  sentQuiz() {}
}
