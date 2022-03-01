import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateTestRoutingModule } from './create-test-routing.module';
import { CreateTestPageComponent } from './create-test-page.component';
import { QuestionComponent } from '../question/question.component';

@NgModule({
  declarations: [CreateTestPageComponent, QuestionComponent],
  imports: [CommonModule, SharedModule, CreateTestRoutingModule],
})
export class CreateTestModule {}
