import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5037/sessions';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(this.apiUrl, loginData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    });
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  setToken(token: string): void {
    console.log('Token saved to localStorage:', token);
    localStorage.setItem('jwt_token', token);
  }

  getRole(): string | null {
    const token = this.getToken();
    console.log('Retrieved token in getRole:', token);
    if (token) {
      const payload = this.decodeToken(token);
      console.log(payload);
      return payload && payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    }
    return null;
  }

  getUsername(): string | null {
    const token = this.getToken();
    console.log('Retrieved token in getUsername:', token);
    if (token) {
      const payload = this.decodeToken(token);
      console.log('Decoded token payload:', payload);
      return payload ? payload.name : null;
    }
    return null;
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeToken(token);
      return payload ? payload.sub : null;
    }
    return null;
  }

  private decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = atob(parts[1]);
      const decodedPayload = JSON.parse(payload);
      const exp = decodedPayload.exp * 1000;
      if (exp < Date.now()) {
        console.error('Token has expired.');
        return null;
      }
      return decodedPayload;
    }
    return null;
  }

  logout(): Observable<any> {
    return this.http.delete<any>(this.apiUrl, {
      withCredentials: true,
    });
  }
}
