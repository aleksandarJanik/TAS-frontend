import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassDetailsRoutingModule } from './class-details-routing.module';
import { ClassDetailsPageComponent } from './class-details-page.component';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { AddActivityComponent } from '../add-activity/add-activity.component';

@NgModule({
  declarations: [
    ClassDetailsPageComponent,
    EditStudentComponent,
    AddActivityComponent,
  ],
  imports: [CommonModule, SharedModule, ClassDetailsRoutingModule],
  exports: [],
})
export class ClassDetailsModule {}
