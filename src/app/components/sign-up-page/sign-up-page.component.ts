import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { UserStateModel } from 'src/app/models/user.model';
import { UserState } from 'src/app/ngxs-store/user/user.state';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidators } from 'src/app/shared/custom-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit, OnDestroy {
  @Select(UserState.getUser) user$: Observable<UserStateModel>;
  userSub: Subscription;
  registerForm: FormGroup;
  public showPassword: boolean;
  public showPasswordConfirm: boolean;
  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      // username: ['', [Validators.required, Validators.minLength(6)]],
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(14),
          CustomValidators.containsLowercase(),
          CustomValidators.containsUpercase(),
          Validators.pattern('^[a-zA-Z0-9 ]+$'),
        ],
        updateOn: 'blur',
      }),
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      }),
      school: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.containsLowercase(),
          CustomValidators.containsUpercase(),
          CustomValidators.containsSpecialCharacters(),
          CustomValidators.containsNumber(),
        ],
        updateOn: 'blur',
      }),
      confirmNewPassword: new FormControl('', {
        validators: [
          Validators.required,
          CustomValidators.matchValidator('password'),
          // Validators.pattern(
          //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          // ),
        ],
        updateOn: 'blur',
      }),
    });
    this.userSub = this.user$.subscribe(async (user) => {
      if (user.loggedIn) {
        this._router.navigate(['/home']);
      }
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  async register() {
    if (!this.registerForm.valid) {
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
      this.registerForm.markAsDirty();
      this.registerForm.markAllAsTouched();
    } else {
      try {
        let response = await this.authService.register(this.registerForm.value);
        if (response) {
          let result = await Swal.fire({
            icon: 'success', //"success" | "error" | "warning" | "info" | "question"
            title: 'User created!',
            text: 'You have successfully registered! Please check you email to activate your account!',
            showCancelButton: false,
            confirmButtonText: 'Ok',
            backdrop: false,
            // footer: '',
          });
          if (result.isConfirmed) {
            this._router.navigate(['/login']);
          }
        }
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
  async ngOnDestroy() {
    try {
      await this.userSub.unsubscribe();
    } catch (e) {}
  }
}
