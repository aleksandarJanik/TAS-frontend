import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/services/exam.service';
import { CreateTestModalComponent } from '../create-test-modal/create-test-modal.component';

@Component({
  selector: 'app-tests-page',
  templateUrl: './tests-page.component.html',
  styleUrls: ['./tests-page.component.scss'],
})
export class TestsPageComponent implements OnInit {
  exams: Exam[] = [];
  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private examsService: ExamService
  ) {}

  async ngOnInit() {
    this.exams = await this.examsService.getExams();
    console.log('exams, ', this.exams);
  }

  createQuiz() {
    let dialogRef = this.dialog.open(CreateTestModalComponent, {
      height: '215px',
      width: '400px',
      // data: { activity, classId: this.classId, studentId: this.student._id },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.data === 'confirmed') {
        // this.student = await this.studentService.getStudentById(this.studentId);
        // this.dataSource = new MatTableDataSource<Activity>(
        //   this.student.activities
        // );
        this._router.navigate([`/test/${result.id}`]);
      }
    });
  }
}
