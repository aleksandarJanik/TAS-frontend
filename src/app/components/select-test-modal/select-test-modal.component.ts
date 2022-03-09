import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exam } from 'src/app/models/exam.model';
import { StudentSpecialTokenDto } from 'src/app/models/specialTokenStudent.model';
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
  choosenExamId: string;
  constructor(
    public dialogRef: MatDialogRef<SelectTestModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private examService: ExamService
  ) {}

  async ngOnInit() {
    this.exams = this.data.exams;
    this.classId = this.data.classId;
    this.presentStudents = this.data.presentStudents;
    this.choosenExamId = this.exams[0]._id;
  }

  async sentQuiz() {
    let studentSpecialTokens: StudentSpecialTokenDto[] = [];
    for (let student of this.presentStudents) {
      let studentSpecialToken: StudentSpecialTokenDto = {
        class: this.classId,
        email: student.email,
        exam: this.choosenExamId,
        student: student._id,
      };
      studentSpecialTokens.push(studentSpecialToken);
    }
    try {
      await this.examService.sendQuiz(studentSpecialTokens);
      this.dialogRef.close({ data: 'confirmed' });
    } catch (e) {
      this.dialogRef.close({ data: 'error' });
    }
  }
}
