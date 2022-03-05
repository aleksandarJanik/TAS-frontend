import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigureQuizPageComponent } from './configure-quiz-page.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigureQuizPageComponent,
    // canActivateChild: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigureQuizRoutingModule {}
