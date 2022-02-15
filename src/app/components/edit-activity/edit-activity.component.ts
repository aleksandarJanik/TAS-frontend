import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity, ActivityDto } from 'src/app/models/activity.model';
import { ActivityService } from 'src/app/services/activity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css'],
})
export class EditActivityComponent implements OnInit {
  studentId: string;
  classId: string;
  activity: Activity;
  activityForm: FormGroup;
  optionsActivity: string[] = [
    'Test',
    'Activity',
    'Essay',
    'Interrogation',
    'Homework',
  ];
  optionsGrades: string[] = ['+', '-', '1', '2', '3', '4', '5'];
  constructor(
    private activityService: ActivityService,
    public dialogRef: MatDialogRef<EditActivityComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.studentId = this.data.studentId;
    this.classId = this.data.classId;
    this.activity = this.data.activity;
    this.activityForm = this.formBuilder.group({
      // username: ['', [Validators.required, Validators.minLength(6)]],

      name: [this.activity?.name, [Validators.required]],
      grade: [this.activity?.grade, [Validators.required]],
    });
  }

  async editactivity() {
    if (!this.activityForm.valid) {
      Swal.fire({
        icon: 'info', //"success" | "error" | "warning" | "info" | "question"
        title: 'Required values!',
        text: 'Please provide all the required values!.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        backdrop: false,
        // timer: 1000,
        // footer: '',
      });
      this.activityForm.markAsDirty();
      this.activityForm.markAllAsTouched();
    } else {
      try {
        let activityDto: ActivityDto = {
          class: this.classId,
          grade: this.activityForm.value.grade,
          name: this.activityForm.value.name,
          student: this.studentId,
        };
        let response = await this.activityService.updateActivity(
          activityDto,
          this.activity._id
        );
        this.dialogRef.close({ data: 'confirmed' });
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
