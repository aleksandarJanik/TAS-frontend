import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Login, UserStateModel } from 'src/app/models/user.model';
import { UserState } from 'src/app/ngxs-store/user/user.state';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Select(UserState.getUser) user$: Observable<UserStateModel>;
  userSub: Subscription;
  username = '';
  password = '';
  constructor(private authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.userSub = this.user$.subscribe(async (user) => {
      if (user.loggedIn) {
        this._router.navigate(['/home']);
      }
    });
  }

  async loginSubmit() {
    let loginDto: Login = {
      username: this.username,
      password: this.password,
    };
    let res = await this.authService.login(loginDto);

    if (res) {
      this._router.navigate(['/home']);
    } else {
      Swal.fire({
        icon: 'error', //"success" | "error" | "warning" | "info" | "question"
        title: 'Login Failed!',
        text: 'Wrong credentials.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        backdrop: false,
        // footer: '',
      });
    }
  }
  async ngOnDestroy() {
    try {
      await this.userSub.unsubscribe();
    } catch (e) {}
  }
}
