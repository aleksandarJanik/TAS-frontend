import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTestPageComponent } from './create-test-page.component';

const routes: Routes = [
  {
    path: '',
    component: CreateTestPageComponent,
    // canActivateChild: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTestRoutingModule {}
