import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { UserStateModel } from './models/user.model';
import { UserState } from './ngxs-store/user/user.state';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  userFromDb: UserStateModel;
  private _mobileQueryListener: () => void;
  href: any;
  // hideItems: boolean = true;
  isMenuOpened: boolean | undefined;
  title = 'tcg-bulk-admin';
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );
  @Select(UserState.getUser) user$: Observable<UserStateModel>;
  userSub: Subscription;
  constructor(
    private storageService: StorageService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    // private router: Router,
    private route: ActivatedRoute
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  async ngOnInit() {
    this.userSub = this.user$.subscribe(async (user) => {
      console.log('AppComponent', user);
      this.userFromDb = user;
    });
    // this.router.events.subscribe((e) => {
    //   if (e instanceof NavigationEnd) {
    //     console.log('url in app:', e.url);
    //     this.hideItems =
    //       e.url === '/login' ||
    //       e.url === '/register' ||
    //       e.url.includes('/quiz/')
    //         ? true
    //         : false;
    //   }
    // });
  }
  async ngOnDestroy() {
    try {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    } catch (e) {}
    try {
      await this.userSub.unsubscribe();
    } catch (e) {}
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
    window.location.host
  );

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
