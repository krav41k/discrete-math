import { Component } from '@angular/core';
import { AuthService } from './shared/services/infrastructure/auth.service';

@Component({
  selector: 'dm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.SignOut();
  }
}
