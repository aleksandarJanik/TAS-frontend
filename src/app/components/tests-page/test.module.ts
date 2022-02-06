import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestsPageComponent } from './tests-page.component';
import { TestRoutingModule } from './test-routing.module';

@NgModule({
  declarations: [TestsPageComponent],
  imports: [CommonModule, SharedModule, TestRoutingModule],
})
export class TestModule {}
