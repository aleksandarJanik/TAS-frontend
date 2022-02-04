import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentDto } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  @Output() addStudentEmmiter: EventEmitter<void> = new EventEmitter();
  show: boolean = true;
  studentForm: FormGroup;
  classId: any;
  constructor(
    private el: ElementRef,
    public formBuilder: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.studentForm = this.formBuilder.group({
      // username: ['', [Validators.required, Validators.minLength(6)]],

      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      }),
    });
    this.classId = this.route.snapshot.paramMap.get('id');
  }
  collapsingAddStudent() {
    let container = this.el.nativeElement.querySelector(
      '#addStudentFormCardBody'
    );

    let icon = this.el.nativeElement.querySelector(
      '#btnForCollapsingAddStudent i'
    );

    this.show = !this.show;

    if (this.show) {
      container.classList.add('collapse');
      icon.classList.add('bi-dash');
      icon.classList.remove('bi-plus');
    } else {
      container.classList.remove('collapse');
      icon.classList.remove('bi-dash');
      icon.classList.add('bi-plus');
    }
  }

  async createStudent() {
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
        let response = await this.studentService.createStudent(studentDto);
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
}
