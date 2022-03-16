import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { CountdownModule } from 'ngx-countdown';
import { QuizResultsPageComponent } from './quiz-results-page.component';
import { QuizResultsRoutingModule } from './quiz-results-routing.module';
import { ResultsSpecificQuestionInModalComponent } from '../results-specific-question-in-modal/results-specific-question-in-modal.component';

@NgModule({
  declarations: [
    QuizResultsPageComponent,
    ResultsSpecificQuestionInModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuizResultsRoutingModule,
    CountdownModule,
  ],
  exports: [],
})
export class QuizResultsModule {}
