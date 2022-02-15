import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangeUserPWDto } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidators } from 'src/app/shared/custom-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent implements OnInit {
  userForm: FormGroup;
  showPassword: boolean;
  showPasswordNew: boolean;
  showPasswordConfirm: boolean;
  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<ChangePasswordModalComponent>
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      currentPassword: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      newPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.containsLowercase(),
          CustomValidators.containsUpercase(),
          CustomValidators.containsNumber(),
          CustomValidators.containsSpecialCharacters(),
        ],
        updateOn: 'blur',
      }),
      confirmNewPassword: new FormControl('', {
        validators: [
          Validators.required,
          CustomValidators.matchValidator('newPassword'),
        ],
        updateOn: 'blur',
      }),
    });
  }

  async createUser() {
    if (!this.userForm.valid) {
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
      this.userForm.markAsDirty();
      this.userForm.markAllAsTouched();
    } else {
      try {
        let changeUserPWDto: ChangeUserPWDto = {
          confirmNewPassword: this.userForm.value.confirmNewPassword,
          currentPassword: this.userForm.value.currentPassword,
          newPassword: this.userForm.value.newPassword,
        };
        console.log(changeUserPWDto);
        let response = await this.authService.changeUserPassword(
          changeUserPWDto
        );
        if (response) {
          let result = await Swal.fire({
            icon: 'success', //"success" | "error" | "warning" | "info" | "question"
            title: 'Password changed!',
            text: 'You successfully change your password!',
            showCancelButton: false,
            confirmButtonText: 'Ok',
            backdrop: false,
            // footer: '',
          });
          if (result.isConfirmed) {
            this.dialogRef.close({});
          }
        }
      } catch (e: any) {
        Swal.fire({
          icon: 'error', //"success" | "error" | "warning" | "info" | "question"
          title: 'Error!',
          text: e.error.error,
          showCancelButton: false,
          confirmButtonText: 'Ok',
          backdrop: false,
          // footer: '',
        });
      }
    }
  }
}
