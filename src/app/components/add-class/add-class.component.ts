import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css'],
})
export class AddClassComponent implements OnInit {
  @Output() classCreated: EventEmitter<void> = new EventEmitter();
  show: boolean = true;
  classForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private el: ElementRef,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.classForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }
  async createClass() {
    if (!this.classForm.valid) {
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
      this.classForm.markAsDirty();
      this.classForm.markAllAsTouched();
    } else {
      try {
        let response = await this.classService.createClasses(
          this.classForm.value
        );
        this.classCreated.emit();
      } catch (e: any) {
        Swal.fire({
          icon: 'error', //"success" | "error" | "warning" | "info" | "question"
          title: 'Name already exist!',
          text: e.error.error,
          showCancelButton: false,
          confirmButtonText: 'Ok',
          backdrop: false,
          // timer: 1000,
          // footer: '',
        });
      }
    }
  }
  collapsingAddClass() {
    let container = this.el.nativeElement.querySelector(
      '#addClassFormCardBody'
    );

    let icon = this.el.nativeElement.querySelector(
      '#btnForCollapsingAddClass i'
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
}
