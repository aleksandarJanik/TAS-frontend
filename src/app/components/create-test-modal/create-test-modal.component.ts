import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExamDto } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-test-modal',
  templateUrl: './create-test-modal.component.html',
  styleUrls: ['./create-test-modal.component.css'],
})
export class CreateTestModalComponent implements OnInit {
  quizForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateTestModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    private examService: ExamService
  ) {}

  ngOnInit() {
    this.quizForm = this.formBuilder.group({
      // username: ['', [Validators.required, Validators.minLength(6)]],

      name: ['', [Validators.required]],
    });
  }
  async createQuiz() {
    if (!this.quizForm.valid) {
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
      this.quizForm.markAsDirty();
      this.quizForm.markAllAsTouched();
    } else {
      try {
        let examDto: ExamDto = {
          name: this.quizForm.value.name,
        };
        let response = await this.examService.createExam(examDto);
        this.dialogRef.close({ data: 'confirmed', id: response._id });
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
