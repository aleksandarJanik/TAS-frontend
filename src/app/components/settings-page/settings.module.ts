import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsPageComponent } from './settings-page.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';

@NgModule({
  declarations: [SettingsPageComponent, ChangePasswordModalComponent],
  imports: [CommonModule, SharedModule, SettingsRoutingModule],
})
export class SettingsModule {}
