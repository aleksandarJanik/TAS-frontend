import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassPageComponent } from './class-page.component';

const routes: Routes = [
  {
    path: '',
    component: ClassPageComponent,
    // canActivateChild: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassRoutingModule {}
