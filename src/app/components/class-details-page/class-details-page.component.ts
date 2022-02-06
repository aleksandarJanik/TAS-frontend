import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { Class } from 'src/app/models/class.model';
import { Student } from 'src/app/models/student.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { EditStudentComponent } from '../edit-student/edit-student.component';

@Component({
  selector: 'app-class-details-page',
  templateUrl: './class-details-page.component.html',
  styleUrls: ['./class-details-page.component.scss'],
})
export class ClassDetailsPageComponent implements OnInit {
  students: Student[] = [];
  classId: any;
  classFromDb: Class;

  public displayedColumns: string[] = [
    'select',
    'student',
    'email',
    'activities',
    'set',
  ];
  public dataSource: MatTableDataSource<Student>;
  public selection = new SelectionModel<Student>(true, []);
  public isShowFilterInput = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private classService: ClassService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get('id');
    this.classFromDb = await this.classService.getClassById(this.classId);
    await this.getStudents();

    console.log(this.students);
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showFilterInput(): void {
    this.isShowFilterInput = !this.isShowFilterInput;
  }

  onEvent(event: any) {
    event.stopPropagation();
  }

  async revmoveStudent(studentId: string) {
    let student = this.students.find((s) => s._id === studentId);
    let result = await Swal.fire({
      icon: 'question', //"success" | "error" | "warning" | "info" | "question"
      title: 'Want remove student?!',
      text: `You are about to remove the student ${student?.firstName.toUpperCase()}. Are you sure?.`,
      showCancelButton: true,
      confirmButtonText: 'Ok',
      backdrop: false,
      // footer: '',
    });
    if (result.isConfirmed) {
      try {
        this.studentService.removeStudent(this.classId, studentId);
        this.students = this.students.filter((s) => s._id !== studentId);
        this.dataSource = new MatTableDataSource<Student>(this.students);
        this.dataSource.paginator = this.paginator;
      } catch (e) {}
    }
  }

  async getStudents() {
    this.students = await this.studentService.getStudentsByClassId(
      this.classId
    );

    this.students.forEach((s) => {
      s.isPicked = false;
      s.isPresent = true;
    });
    this.dataSource = new MatTableDataSource<Student>(this.students);
    this.dataSource.paginator = this.paginator;
  }

  openModalToEditStudent(student: Student) {
    let dialogRef = this.dialog.open(EditStudentComponent, {
      height: '415px',
      width: '400px',
      data: { student, classId: this.classId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data === 'confirmed') {
        this.getStudents();
      }
    });
  }

  openModalToAddactivity(student: Student) {
    let dialogRef = this.dialog.open(AddActivityComponent, {
      height: '315px',
      width: '400px',
      data: { student, classId: this.classId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data === 'confirmed') {
        this.getStudents();
      }
    });
  }

  openModalToEditactivities(student:Student){

  }
}
