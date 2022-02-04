import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() studentToAddActivity: Student;
  @Input() classId: string;
  @Output() addActivityEmmiter: EventEmitter<void> = new EventEmitter();
  activityName: string;
  grade: string;
  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {}

  async addActivity() {
    let activityDto: ActivityDto = {
      student: this.studentToAddActivity._id,
      grade: this.grade,
      class: this.classId,
      name: this.activityName.toLocaleLowerCase(),
    };

    try {
      await this.activityService.createActivity(activityDto);
      this.addActivityEmmiter.emit();
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
