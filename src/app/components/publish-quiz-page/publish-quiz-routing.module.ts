import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublishQuizPageComponent } from './publish-quiz-page.component';

const routes: Routes = [
  {
    path: '',
    component: PublishQuizPageComponent,
    // canActivateChild: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishQuizRoutingModule {}
