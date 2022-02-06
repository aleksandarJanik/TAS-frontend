import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestsPageComponent } from './tests-page.component';

const routes: Routes = [
  {
    path: '',
    component: TestsPageComponent,
    // canActivateChild: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule {}
