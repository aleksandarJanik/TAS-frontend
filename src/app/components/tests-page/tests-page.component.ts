import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';
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
    private examsService: ExamService,
    private _snackBar: MatSnackBar
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

  goToPreview(exam: Exam) {
    if (exam.questions.length > 0) {
      this._router.navigate([`/preview/${exam._id}`]);
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

  async deleteQuiz(examId: string) {
    let result = await Swal.fire({
      icon: 'question', //"success" | "error" | "warning" | "info" | "question"
      title: 'Want remove activity?!',
      text: `You can't go back back. Are you sure?.`,
      showCancelButton: true,
      confirmButtonText: 'Ok',
      backdrop: false,
      // footer: '',
    });
    if (result.isConfirmed) {
      try {
        await this.examsService.removeExam(examId);
        this._snackBar.open('Quiz removed!', 'close', {
          duration: 1500,
        });
        this.exams = this.exams.filter((e) => e._id !== examId);
      } catch (e) {}
    }
  }
}
