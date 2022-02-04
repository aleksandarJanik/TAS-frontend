import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassDetailsRoutingModule } from './class-details-routing.module';
import { ClassDetailsPageComponent } from './class-details-page.component';

@NgModule({
  declarations: [ClassDetailsPageComponent],
  imports: [CommonModule, SharedModule, ClassDetailsRoutingModule],
  exports: [],
})
export class ClassDetailsModule {}
