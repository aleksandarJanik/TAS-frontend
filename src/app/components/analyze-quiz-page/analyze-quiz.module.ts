import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnalyzeQuizComponent } from './analyze-quiz.component';
import { AnalyzeQuizRoutingModule } from './analyze-quiz-routing.module';

@NgModule({
  declarations: [AnalyzeQuizComponent],
  imports: [CommonModule, SharedModule, AnalyzeQuizRoutingModule],
  exports: [],
})
export class AnalyzeQuizModule {}
