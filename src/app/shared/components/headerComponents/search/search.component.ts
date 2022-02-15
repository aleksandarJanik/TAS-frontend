import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Class } from 'src/app/models/class.model';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public isShowInput = false;
  classes: Class[];
  searchValue = '';
  filteredClasses: Class[];
  isRoutingWithReload = false;
  constructor(
    private classService: ClassService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    router.events.subscribe(async (e) => {
      if (e instanceof NavigationEnd) {
        // console.log('SearchComponent', e.url.indexOf('/class/') !== -1);
        if (e.url.indexOf('/class/') !== -1) {
          this.isRoutingWithReload = true;
        } else {
          this.isRoutingWithReload = false;
        }
      }
    });
  }

  async ngOnInit() {
    console.log(
      'SearchComponent isRoutingWithReload',
      this.isRoutingWithReload
    );
    this.classes = await this.classService.getClasses();
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
      this.filteredClasses = [];
    } else {
      this.filteredClasses = this.classes.filter(
        (c) => c.name.indexOf(this.searchValue) !== -1
      );
    }
  }
  onSelectionChange(event: any) {
    console.log('onSelectionChange called', event.option.value._id);
    this.searchValue = '';
    this.filteredClasses = [];
    if (this.isRoutingWithReload) {
      this.router.navigate(['/class', event.option.value._id]).then(() => {
        window.location.reload();
      });
    } else {
      this.router.navigate(['/class', event.option.value._id]);
    }
  }
}
