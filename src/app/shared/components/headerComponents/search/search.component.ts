import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Class } from 'src/app/models/class.model';
import { Exam } from 'src/app/models/exam.model';
import { FilteredSearchThings } from 'src/app/models/global.model';
import { ClassService } from 'src/app/services/class.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public isShowInput = false;
  classes: Class[];
  exams: Exam[];
  searchValue = '';
  // filteredClasses: Class[];
  isRoutingWithReload = false;
  searchThings: FilteredSearchThings[] = [];
  filteredSearchThings: FilteredSearchThings[] = [];
  constructor(
    private classService: ClassService,
    private router: Router,
    private route: ActivatedRoute,
    private examService: ExamService
  ) {
    router.events.subscribe(async (e) => {
      if (e instanceof NavigationEnd) {
        // console.log('SearchComponent', e.url.indexOf('/class/') !== -1);
        if (e.url.indexOf('/class/') !== -1 || e.url.indexOf('/test/') !== -1) {
          this.isRoutingWithReload = true;
        } else {
          this.isRoutingWithReload = false;
        }
      }
    });
  }

  async ngOnInit() {
    // console.log(
    //   'SearchComponent isRoutingWithReload',
    //   this.isRoutingWithReload
    // );
    this.exams = await this.examService.getExams();
    this.classes = await this.classService.getClasses();
    let filteredExams = await this.exams.map((e) => {
      let fil: FilteredSearchThings = {
        _id: e._id,
        name: e.name,
        isClass: false,
      };
      return fil;
    });
    let filteredClasses = await this.classes.map((c) => {
      let fil: FilteredSearchThings = {
        _id: c._id,
        name: c.name,
        isClass: true,
      };
      return fil;
    });
    this.searchThings.push(...filteredExams);
    this.searchThings.push(...filteredClasses);
    console.log(this.searchThings);
  }

  @HostListener('click', ['$event'])
  public showInput(event: any): void {
    // console.log(event);
    event.stopPropagation();
    this.isShowInput = true;
  }

  @HostListener('document:click')
  clickout() {
    this.isShowInput = false;
  }

  getData() {
    if (this.searchValue.trim() === '') {
      this.filteredSearchThings = [];
    } else {
      this.filteredSearchThings = this.searchThings.filter(
        (c) =>
          c.name
            .toLocaleLowerCase()
            .indexOf(this.searchValue.toLocaleLowerCase()) !== -1
      );
    }
  }
  onSelectionChange(event: any) {
    console.log('onSelectionChange called', event.option.value._id);
    this.searchValue = '';
    this.filteredSearchThings = [];
    let clicked = this.searchThings.find(
      (f) => f._id === event.option.value._id
    );
    console.log('clicked: ', clicked);
    let nav = clicked?.isClass ? '/class' : '/test';
    if (this.isRoutingWithReload) {
      this.router.navigate([nav, event.option.value._id]).then(() => {
        window.location.reload();
      });
    } else {
      this.router.navigate([nav, event.option.value._id]);
    }
  }
}
