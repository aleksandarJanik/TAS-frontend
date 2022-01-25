import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpPageComponent } from './sign-up-page.component';
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
  declarations: [SignUpPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    SignUpRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SignUpModule {}
