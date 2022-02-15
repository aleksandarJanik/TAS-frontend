import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openModalToChangeUserPassword() {
    let dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      width: '600px',
    });
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   if (result.data === 'confirmed') {
    //   }
    // });
  }
}
