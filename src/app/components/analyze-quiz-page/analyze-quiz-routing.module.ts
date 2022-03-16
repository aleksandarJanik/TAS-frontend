import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyzeQuizComponent } from './analyze-quiz.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyzeQuizComponent,
    // canActivateChild: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyzeQuizRoutingModule {}
