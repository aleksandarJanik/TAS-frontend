import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() isShowSidebar = new EventEmitter<boolean>();
  // public user$: Observable<User>;
  // public emails$: Observable<Email[]>;
  // public routers: typeof routes = routes;

  constructor(
    // private userService: AuthService,
    // private emailService: EmailService,
    private router: Router
  ) {
    // this.user$ = this.userService.getUser();
    // this.emails$ = this.emailService.loadEmails();
  }
  ngOnInit(): void {}

  public signOut(): void {
    // this.userService.signOut();
    // this.router.navigate([this.routers.LOGIN]);
  }
}
