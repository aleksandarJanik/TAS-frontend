import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../ngxs-store/user/user.state';
import { UserStateModel } from '../models/user.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  @Select(UserState.getUser) getUser$: Observable<UserStateModel>;
  loaded = false;
  user: UserStateModel;
  constructor(
    private auth: AuthService,
    private store: Store,
    private _router: Router
  ) {
    this.getUser$.subscribe((user) => (this.user = user));
  }

  sleep(x: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, x);
    });
  }

  async canActivate(route: ActivatedRouteSnapshot) {
    while (this.user.loaded === false) {
      await this.sleep(5);
    }

    let navigateUrl =
      '/' +
      route.pathFromRoot
        .filter((v) => v.routeConfig)
        .map((v) => v.routeConfig?.path)
        .join('/');

    if (!this.user.loggedIn) {
      Swal.fire({
        icon: 'error', //"success" | "error" | "warning" | "info" | "question"
        title: 'Unauthorized!',
        text: 'You are not allowed to access that page.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        backdrop: false,
        // footer: '',
      });
      this._router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
