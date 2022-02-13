import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public isShowInput = false;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('click', ['$event'])
  public showInput(event: any): void {
    console.log(event);
    event.stopPropagation();
    this.isShowInput = true;
  }

  @HostListener('document:click')
  clickout() {
    this.isShowInput = false;
  }
}
