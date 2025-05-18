import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.error = '';
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/app'); // Redirect after successful login
        },
        error: (err) => {
          console.error('Login error', err);
          this.error = 'Invalid username or password';
        },
      });
  }
}
