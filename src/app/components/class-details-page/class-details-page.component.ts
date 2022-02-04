import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { Class } from 'src/app/models/class.model';
import { Student } from 'src/app/models/student.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-class-details-page',
  templateUrl: './class-details-page.component.html',
  styleUrls: ['./class-details-page.component.css'],
})
export class ClassDetailsPageComponent implements OnInit {
  students: Student[] = [];
  classId: any;
  classFromDb: Class;
  studentToEdit: Student | null;
  @ViewChild('closeModal') closeModal: any;
  studentToAddActivity: Student;

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private classService: ClassService
  ) {}

  async ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get('id');
    this.classFromDb = await this.classService.getClassById(this.classId);
    await this.getStudents();

    console.log(this.students);
  }

  openModalToEdit(student: Student) {
    this.studentToEdit = student;
  }

  checkValue(student: Student): void {
    student.isPresent = !student.isPresent;
  }

  startClassLecturing() {
    let presentStudents = this.students.filter((s) => s.isPresent === true);
    this.studentService.presentStudents = presentStudents;
    localStorage.setItem('presentStudents', JSON.stringify(presentStudents));
    // console.log(JSON.stringify(this.presentStudents));
    // let childWindow = window.open("http://localhost:4200/pick", "_blank");

    // const BrowserWindow = this.electronService.remote.BrowserWindow;
    // let childWindow = new BrowserWindow({
    //   resizable: false,
    //   alwaysOnTop: true,
    //   minimizable: false,
    //   webPreferences: {
    //     webSecurity: false,
    //   },
    // });
    // let urlToLoad = this.electronService.url.format({
    //   pathname: this.electronService.path.join(__dirname),
    //   protocol: 'file:',
    //   slashes: true,
    // });
    // childWindow.loadURL(urlToLoad + '/#/pick');
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
      } catch (e) {}
    }
  }

  modalClose() {
    this.studentToEdit = null;
    this.closeModal.nativeElement.click();
  }
  async getStudents() {
    this.students = await this.studentService.getStudentsByClassId(
      this.classId
    );
    this.students.forEach((s) => {
      s.isPicked = false;
      s.isPresent = true;
    });
  }

  openModalToAddActivity(student: Student) {
    this.studentToAddActivity = student;
  }

  async logout() {
    await this.authService.logout();
  }
}
