import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public isShowInput = false;

  constructor() {}

  ngOnInit(): void {}
  public showInput(): void {
    this.isShowInput = true;
  }
}
