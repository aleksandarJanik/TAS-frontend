import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { Class } from 'src/app/models/class.model';
import { Student } from 'src/app/models/student.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

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
    public dialog: MatDialog,
    router: Router
  ) {}

  async ngOnInit() {
    // console.log(this.students);
    this.classId = this.route.snapshot.paramMap.get('id');
    this.classFromDb = await this.classService.getClassById(this.classId);
    await this.getStudents();
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
      if (result && result.data === 'confirmed') {
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
      if (result && result.data === 'confirmed') {
        this.getStudents();
      }
    });
  }

  exportInCsv() {
    let maxLengthActivities = 0;
    let arrToExport = this.students.map((student) => {
      let activities: any = new Object();
      if (student.activities) {
        if (student.activities.length > maxLengthActivities) {
          maxLengthActivities = student.activities.length;
        }
        student.activities.forEach((activity, index) => {
          activities[`Activity_${index}`] = activity.name;
          activities[`Grade_${index}`] = activity.grade;

          // activities.push({ activity_1: activity.name });
          // activities.push({ grade_1: activity.grade });
        });
      }

      return {
        class: this.classFromDb.name,
        first_name: student.firstName,
        last_name: student.lastName,
        email: student.email,
        ...activities,
      };
    });
    let arrAc = [];
    for (let i = 1; i <= maxLengthActivities; i++) {
      let ac = `Activity_${i}`;
      let gr = `Grade_${i}`;
      arrAc.push(ac);
      arrAc.push(gr);
    }
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: `Class ${this.classFromDb.name}`,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      useHeader: false,
      nullToEmptyString: true,
      headers: ['Class', 'First Name', 'Last name', 'mail', ...arrAc],
    };
    // console.log(arrToExport);

    new AngularCsv(arrToExport, `Class_${this.classFromDb.name}`, options);
  }
}
