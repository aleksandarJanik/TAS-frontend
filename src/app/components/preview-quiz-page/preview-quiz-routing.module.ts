import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreviewQuizPageComponent } from './preview-quiz-page.component';

const routes: Routes = [
  {
    path: '',
    component: PreviewQuizPageComponent,
    // canActivateChild: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewQuizRoutingModule {}
