import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { Class } from 'src/app/models/class.model';
import { Student } from 'src/app/models/student.model';
import { ActivityService } from 'src/app/services/activity.service';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';

@Component({
  selector: 'app-view-activities-page',
  templateUrl: './view-activities-page.component.html',
  styleUrls: ['./view-activities-page.component.scss'],
})
export class ViewActivitiesPageComponent implements OnInit {
  student: Student;
  studentId: any;
  classId: any;
  classFromDb: Class;
  public displayedColumns: string[] = [
    'createdAt',
    'acitivity',
    'grade',
    'set',
  ];
  public dataSource: MatTableDataSource<Activity>;
  public isShowFilterInput = false;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private classService: ClassService,
    private activityService: ActivityService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get('id');
    this.classFromDb = await this.classService.getClassById(this.classId);
    this.studentId = this.route.snapshot.paramMap.get('studentId');
    this.student = await this.studentService.getStudentById(this.studentId);
    this.dataSource = new MatTableDataSource<Activity>(this.student.activities);
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showFilterInput(): void {
    this.isShowFilterInput = !this.isShowFilterInput;
  }

  async revmoveActivity(activityId: string) {
    let activity = this.student.activities.find(
      (a: Activity) => a._id === activityId
    );
    let result = await Swal.fire({
      icon: 'question', //"success" | "error" | "warning" | "info" | "question"
      title: 'Want remove activity?!',
      text: `You are about to remove the activity ${activity?.name.toUpperCase()} - ${
        activity?.grade
      }. Are you sure?.`,
      showCancelButton: true,
      confirmButtonText: 'Ok',
      backdrop: false,
      // footer: '',
    });
    if (result.isConfirmed) {
      try {
        this.activityService.removeActivity(
          activityId,
          this.student.class,
          this.student._id
        );
        this.student.activities = this.student.activities.filter(
          (a: Activity) => a._id !== activityId
        );
        this.dataSource = new MatTableDataSource<Activity>(
          this.student.activities
        );
      } catch (e) {}
    }
  }

  async updateActivity(activityId: string) {
    let activity = await this.student.activities.find(
      (s) => s._id === activityId
    );
    let dialogRef = this.dialog.open(EditActivityComponent, {
      height: '315px',
      width: '400px',
      data: { activity, classId: this.classId, studentId: this.student._id },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.data === 'confirmed') {
        this.student = await this.studentService.getStudentById(this.studentId);
        this.dataSource = new MatTableDataSource<Activity>(
          this.student.activities
        );
      }
    });
  }
}
