import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  AccessToken,
  ChangeUserPWDto,
  Login,
  RefreshTokenDto,
  RegisterCustomerDto,
  ResetPasswordDto,
  TokenWithRefresh,
  User,
  UserStateModel,
} from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';
import { Select, Store } from '@ngxs/store';
import { AddAccessToken, AddUser } from '../ngxs-store/user/user.actions';
import { UserState } from '../ngxs-store/user/user.state';
import { lastValueFrom, Observable, Subscription } from 'rxjs';
import { AppConstants } from '../shared/constants';
import Swal from 'sweetalert2';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // public user: UserStateModel;
  @Select(UserState.getUser) user$: Observable<UserStateModel>;
  user: UserStateModel;

  constructor(
    private storageService: StorageService,
    // private plt: Platform,
    private router: Router,
    private http: HttpClient,
    private store: Store,
    private _router: Router
  ) {
    this.loadStoredTokens();
    this.user$.subscribe((data) => (this.user = data));
  }

  async loadStoredTokens() {
    console.log('loadStoredToken');
    // await this.plt.ready();
    console.log('loadStoredToken plt ready');

    let token = await this.storageService.getAccessToken();
    // let refreshToken = await this.storageService.getRefreshToken();
    console.log('loadStoredToken token:', token);
    if (token) {
      await this.getUserFromApiAndUpdateState();
    } else {
      let user: UserStateModel = {
        loaded: true,
        loggedIn: false,
      };
      await lastValueFrom(this.store.dispatch(new AddUser(user)));
    }
  }

  async getUserFromApiAndUpdateState() {
    let userCheckLogin: any;
    let user: UserStateModel;
    try {
      userCheckLogin = await this.checkLogin();

      console.log('userCheckLogin: ', userCheckLogin);
      user = {
        _id: userCheckLogin._id,
        loaded: true,
        loggedIn: true,
        role: userCheckLogin.userRole.name,
        username: userCheckLogin.username,
        activated: userCheckLogin.activated,
        email: userCheckLogin.email,
        firstName: userCheckLogin.firstName,
        lastName: userCheckLogin.lastName,
        school: userCheckLogin.school,
        subject: userCheckLogin.subject,
      };
    } catch (ex) {
      console.log('checklogin ex', ex);
      user = {
        loaded: true,
        loggedIn: false,
      };
    }

    await lastValueFrom(this.store.dispatch(new AddUser(user)));
  }

  async login(loginDto: Login) {
    let token: any;
    try {
      token = await lastValueFrom(
        this.http.post<TokenWithRefresh>(
          `${AppConstants.API_URL}/login`,
          loginDto
        )
      );
    } catch (ex) {}
    if (!token) {
      return null;
    }

    await this.storageService.addAccessToken(token.accessToken);
    await this.storageService.addRefreshToken(token.refreshToken);
    await this.getUserFromApiAndUpdateState();
    return token;
  }

  async refreshToken() {
    let refreshToken = await this.storageService.getRefreshToken();
    if (!refreshToken) {
      return null;
    }
    let refreshTokenDto: RefreshTokenDto = {
      refreshToken,
    };
    let token: any;
    console.log('auth service calling refresh token');
    try {
      token = await lastValueFrom(
        this.http.post<TokenWithRefresh>(
          `${AppConstants.API_URL}/refreshtoken`,
          refreshTokenDto
        )
      );
      console.log('refresh token', token);
    } catch (ex) {
      console.log('Refresh token error auth service', ex);
    }
    if (!token) {
      this.logout(true);
      return null;
    }
    // let decoded = helper.decodeToken<UserDecodedModel>(token.accessToken);
    // let userStateModel: UserStateModel = {
    //   _id: decoded._id,
    //   username: decoded.username,
    //   accessToken: token.accessToken,
    //   role: decoded.role,
    //   refreshToken,
    //   loaded: true,
    //   loggedIn: true,
    // };
    // await this.store.dispatch(new AddUser(userStateModel)).toPromise();
    await this.storageService.addAccessToken(token.accessToken);
    await this.getUserFromApiAndUpdateState();

    return token;
  }

  async logout(refreshExpired = false) {
    let refreshToken: any;
    refreshToken = await this.storageService.getRefreshToken();
    let refreshTokenDto: RefreshTokenDto = {
      refreshToken,
    };
    await this.storageService.removeAccessToken();
    await this.storageService.removeRefreshToken();
    let user = {
      loaded: true,
      loggedIn: false,
    };
    await lastValueFrom(this.store.dispatch(new AddUser(user)));

    this._router.navigate(['/login']);

    if (refreshExpired) {
      Swal.fire({
        icon: 'error', //"success" | "error" | "warning" | "info" | "question"
        title: 'Error!',
        text: 'Your token has expired. Please log in again',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        backdrop: false,
        // footer: '',
      });
    }
    let response = await lastValueFrom(
      this.http.post<User>(`${AppConstants.API_URL}/logout`, refreshTokenDto)
    );
  }

  async register(userDto: RegisterCustomerDto) {
    let response = await lastValueFrom(
      this.http.post<any>(`${AppConstants.API_URL}/register`, userDto)
    );
    return response;
  }

  async checkLogin(): Promise<User | undefined> {
    // let response = await lastValueFrom(
    //   this.http.post<User>(`${AppConstants.API_URL}/check-login`, {})
    // );
    // console.log('checkLogin', response);
    return this.http
      .post<User>(`${AppConstants.API_URL}/check-login`, {})
      .toPromise();
  }

  async changeUserPassword(changeUserPW: ChangeUserPWDto) {
    let response = await lastValueFrom(
      this.http.post<any>(
        `${AppConstants.API_URL}/users/change-password`,
        changeUserPW
      )
    );
    return response;
  }

  async changeUserPasswordWithToken(
    changeUserPW: ResetPasswordDto,
    token: string
  ) {
    changeUserPW.token = token;
    let response = await lastValueFrom(
      this.http.post<any>(
        `${AppConstants.API_URL}/reset-password`,
        changeUserPW
      )
    );
    return response;
  }

  async resetPasswordToken(usernameOrEmail: string) {
    return await lastValueFrom(
      this.http.post<string>(`${AppConstants.API_URL}/forgot-password`, {
        usernameOrEmail,
      })
    );
  }
  async checkTokenValidation(token: any) {
    return await lastValueFrom(
      this.http.post<string>(`${AppConstants.API_URL}/validate-token`, {
        token,
      })
    );
  }

  async activateUser(token: any) {
    return await lastValueFrom(
      this.http.post<any>(`${AppConstants.API_URL}/users/activate`, {
        token,
      })
    );
  }

  async reSendMailForUserActivation(username: string) {
    return await lastValueFrom(
      this.http.post<any>(`${AppConstants.API_URL}/users/resend-activation`, {
        username,
      })
    );
  }
}
