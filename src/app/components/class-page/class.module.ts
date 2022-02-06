import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassPageComponent } from './class-page.component';
import { ClassRoutingModule } from './class-routing.module';

@NgModule({
  declarations: [ClassPageComponent],
  imports: [CommonModule, SharedModule, ClassRoutingModule],
})
export class ClassModule {}
