import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityDto } from 'src/app/models/activity.model';
import { Student } from 'src/app/models/student.model';
import { ActivityService } from 'src/app/services/activity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css'],
})
export class AddActivityComponent implements OnInit {
  studentToAddActivity: Student;
  classId: string;
  // @Output() addActivityEmmiter: EventEmitter<void> = new EventEmitter();
  activityName: string = '';
  grade: string = '';
  constructor(
    private activityService: ActivityService,
    public dialogRef: MatDialogRef<AddActivityComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.studentToAddActivity = this.data.student;
    this.classId = this.data.classId;
  }

  async addActivity() {
    if (this.activityName.trim() === '' || this.grade.trim() === '') {
      Swal.fire({
        icon: 'info', //"success" | "error" | "warning" | "info" | "question"
        title: 'Required values!',
        text: 'Activity name and grade are Required!.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        backdrop: false,
        // timer: 1000,
        // footer: '',
      });
    } else {
      let activityDto: ActivityDto = {
        student: this.studentToAddActivity._id,
        grade: this.grade,
        class: this.classId,
        name: this.activityName.toLocaleLowerCase(),
      };

      try {
        await this.activityService.createActivity(activityDto);
        this.dialogRef.close({ data: 'confirmed' });
        // this.addActivityEmmiter.emit();
      } catch (e: any) {
        Swal.fire({
          icon: 'error', //"success" | "error" | "warning" | "info" | "question"
          title: 'Error!',
          text: e.error.message,
          showCancelButton: false,
          confirmButtonText: 'Ok',
          backdrop: false,
          // footer: '',
        });
      }
    }
  }
}
