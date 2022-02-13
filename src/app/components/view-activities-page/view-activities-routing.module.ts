import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewActivitiesPageComponent } from './view-activities-page.component';

const routes: Routes = [
  {
    path: '',
    component: ViewActivitiesPageComponent,
    // canActivateChild: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewActivitiesRoutingModule {}
