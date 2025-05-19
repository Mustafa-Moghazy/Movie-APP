import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
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
          console.log('Login successful');
          const role = this.authService.getRoleFromToken();
          if (role === 'ADMIN') {
            this.router.navigateByUrl('/admin-dashboard');
          } else {
            this.router.navigateByUrl('/user-dashboard');
          }
        },
        error: (err) => {
          console.error('Login error', err);
          this.error = 'Invalid username or password';
        },
      });
  }
}
