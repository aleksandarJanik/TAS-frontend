import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizResultsPageComponent } from './quiz-results-page.component';

const routes: Routes = [
  {
    path: '',
    component: QuizResultsPageComponent,
    // canActivateChild: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizResultsRoutingModule {}
