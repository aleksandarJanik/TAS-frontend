import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user = 'Smiljan Mori';
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  // public routes: typeof routes = routes;
  public flatlogicEmail: string = 'https://flatlogic.com';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  async signOutEmit() {
    await this.authService.logout();
  }
}
