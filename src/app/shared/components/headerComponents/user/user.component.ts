import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { UserStateModel } from 'src/app/models/user.model';
import { UserState } from 'src/app/ngxs-store/user/user.state';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userState: UserStateModel;
  signOut: EventEmitter<void> = new EventEmitter<void>();
  userSub: Subscription;
  @Select(UserState.getUser) user$: Observable<UserStateModel>;
  // public routes: typeof routes = routes;
  public flatlogicEmail: string = 'https://flatlogic.com';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.user$.subscribe(async (user) => {
      // console.log('UserComponent', user);
      this.userState = user;
    });
  }

  async signOutEmit() {
    await this.authService.logout();
  }
}
