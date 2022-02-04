import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Activity } from 'src/app/models/activity.model';
import { Student, StudentDto } from 'src/app/models/student.model';
import { ActivityService } from 'src/app/services/activity.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  @Input() student: Student;
  @Input() classId: string;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() addStudentEmmiter: EventEmitter<void> = new EventEmitter();
  @ViewChild('editFormEl') editFormEl: any;
  studentForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private studentService: StudentService,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    console.log(this.student);
    this.studentForm = this.formBuilder.group({
      // username: ['', [Validators.required, Validators.minLength(6)]],

      firstName: [this.student.firstName, [Validators.required]],
      lastName: [this.student.lastName, [Validators.required]],
      email: new FormControl(this.student.email, {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      }),
    });
  }
  submitEditForm() {
    this.editFormEl.nativeElement.submit();
  }
  closeModalFunc() {
    this.closeModal.emit();
  }
  async editStudent() {
    if (!this.studentForm.valid) {
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
      this.studentForm.markAsDirty();
      this.studentForm.markAllAsTouched();
    } else {
      try {
        let studentDto: StudentDto = {
          class: this.classId,
          email: this.studentForm.value.email,
          firstName: this.studentForm.value.firstName,
          lastName: this.studentForm.value.lastName,
        };
        let response = await this.studentService.updateStudent(
          studentDto,
          this.student._id
        );
        this.closeModal.emit();
        this.addStudentEmmiter.emit();
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

  async revmoveActivity(activityId: string) {
    let activity = this.student.activities.find((a) => a._id === activityId);
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
          (a) => a._id !== activityId
        );
      } catch (e) {}
    }
  }

  editActivity(index: number, grade: string) {}
}
