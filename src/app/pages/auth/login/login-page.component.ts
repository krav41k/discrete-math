import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/infrastructure/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6)])
  });

  constructor(private authService: AuthService) {}

  signIn(): void {
    const { email, password } = this.form.value;
    if (email && password) {
      this.authService.SignIn(email, password);
    }
  }

  onAnonymousLogin(): void {
    this.authService.doAnonymousLogin();
  }
}
