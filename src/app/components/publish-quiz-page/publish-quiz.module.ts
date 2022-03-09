import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { PublishQuizPageComponent } from './publish-quiz-page.component';
import { PublishQuizRoutingModule } from './publish-quiz-routing.module';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [PublishQuizPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    PublishQuizRoutingModule,
    CountdownModule,
  ],
})
export class PublishQuizModule {}
