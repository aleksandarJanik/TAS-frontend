import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { CreateNoteModalComponent } from 'src/app/components/create-note-modal/create-note-modal.component';
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
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    router: Router
  ) {}

  ngOnInit() {
    this.userSub = this.user$.subscribe(async (user) => {
      // console.log('UserComponent', user);
      this.userState = user;
    });
  }

  async signOutEmit() {
    await this.authService.logout();
  }
  async openModalToCreateNote() {
    let dialogRef = this.dialog.open(CreateNoteModalComponent, {
      height: '315px',
      width: '400px',
      // data: { student, classId: this.classId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data === 'confirmed') {
      }
    });
  }
}
