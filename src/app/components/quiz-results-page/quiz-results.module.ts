import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { CountdownModule } from 'ngx-countdown';
import { QuizResultsPageComponent } from './quiz-results-page.component';
import { QuizResultsRoutingModule } from './quiz-results-routing.module';

@NgModule({
  declarations: [QuizResultsPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    QuizResultsRoutingModule,
    CountdownModule,
  ],
})
export class QuizResultsModule {}
