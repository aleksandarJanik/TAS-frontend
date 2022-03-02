import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from '../chart/chart.component';
import { NotesComponent } from '../notes/notes.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PreviewQuizPageComponent } from './preview-quiz-page.component';
import { PreviewQuizRoutingModule } from './preview-quiz-routing.module';
import { ShowQuestionComponent } from '../show-question/show-question.component';

@NgModule({
  declarations: [PreviewQuizPageComponent, ShowQuestionComponent],
  imports: [CommonModule, SharedModule, PreviewQuizRoutingModule],
})
export class PreviewQuizModule {}
