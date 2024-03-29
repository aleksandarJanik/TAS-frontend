import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from '../chart/chart.component';
import { NotesComponent } from '../notes/notes.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [HomePageComponent, ChartComponent, NotesComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NgChartsModule,
    AngularEditorModule,
  ],
})
export class HomeModule {}
