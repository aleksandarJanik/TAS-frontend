import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigureQuizRoutingModule } from './configure-quiz-routing.module';
import { ConfigureQuizPageComponent } from './configure-quiz-page.component';

@NgModule({
  declarations: [ConfigureQuizPageComponent],
  imports: [CommonModule, SharedModule, ConfigureQuizRoutingModule],
})
export class ConfigureQuizModule {}
