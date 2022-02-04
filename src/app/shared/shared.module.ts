import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddClassComponent } from '../components/add-class/add-class.component';
import { AddStudentComponent } from '../components/add-student/add-student.component';
import { EditStudentComponent } from '../components/edit-student/edit-student.component';
import { AddActivityComponent } from '../components/add-activity/add-activity.component';

@NgModule({
  declarations: [
    AddClassComponent,
    AddStudentComponent,
    EditStudentComponent,
    AddActivityComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddClassComponent,
    AddStudentComponent,
    EditStudentComponent,
    AddActivityComponent,
  ],
})
export class SharedModule {}
