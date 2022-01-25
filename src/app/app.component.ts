import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { UserStateModel } from './models/user.model';
import { UserState } from './ngxs-store/user/user.state';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(UserState.getUser) user$: Observable<UserStateModel>;
  userSub: Subscription;
  constructor(private storageService: StorageService) {}
  async ngOnInit() {
    this.userSub = this.user$.subscribe(async (user) => {
      console.log('AppComponent', user);
    });
  }
  async ngOnDestroy() {
    try {
      await this.userSub.unsubscribe();
    } catch (e) {}
  }
}
