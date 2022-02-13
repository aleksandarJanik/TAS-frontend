import { Component, ElementRef, OnInit } from '@angular/core';
import { ClassWithStats } from 'src/app/models/class.model';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  classes: ClassWithStats[];
  constructor(private classService: ClassService) {}
  async ngOnInit() {
    this.classes = await this.classService.getClassesWithStats();
    console.log(this.classes);
  }
}
