import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewActivitiesPageComponent } from './view-activities-page.component';
import { ViewActivitiesRoutingModule } from './view-activities-routing.module';

@NgModule({
  declarations: [ViewActivitiesPageComponent],
  imports: [CommonModule, SharedModule, ViewActivitiesRoutingModule],
})
export class ViewActivitiesModule {}
