import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  @Input() emails = [
    { name: 'Jane Hew', message: 'Hey! How is it going?', time: '9:32' },
    {
      name: 'Lloyd Brown',
      message: 'Check out my new Dashboard',
      time: '9:18',
    },
    {
      name: 'Mark Winstein',
      message: 'I want rearrange the appointm...',
      time: '9:15',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  public colors: string[] = ['yellow', 'green', 'blue', 'ping'];
}
