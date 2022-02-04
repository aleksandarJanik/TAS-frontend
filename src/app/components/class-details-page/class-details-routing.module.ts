import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassDetailsPageComponent } from './class-details-page.component';

const routes: Routes = [
  {
    path: '',
    component: ClassDetailsPageComponent,
    // canActivateChild: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassDetailsRoutingModule {}
