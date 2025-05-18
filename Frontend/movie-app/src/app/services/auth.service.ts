import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwt-request-model';
import { Observable, map } from 'rxjs';
import { JwtResponse } from '../models/jwt-response-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';
  private tokenKey = 'jwt';

  constructor(private http: HttpClient) {}

  login(credentials: JwtRequest): Observable<boolean> {
    return this.http.post<JwtResponse>(this.apiUrl, credentials).pipe(
      map((response) => {
        this.saveToken(response.token);
        return true;
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
