import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/infrastructure/auth.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6)])
  });

  constructor(private authService: AuthService) {}

  signUp(): void {
    const { email, password } = this.form.value;

    if (email && password) {
      this.authService.SignUp(email, password);
    }
  }
}
