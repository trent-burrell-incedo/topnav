import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl + 'auth', { username, password }, { headers, observe: 'response' })
      // return of({ token: 'abc' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response?.body) {
            localStorage.setItem('userDetail', JSON.stringify(response?.body));
            localStorage.setItem('token', response?.body.token);
          }
          return response.body;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token;
  }

  getUserDetails() {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } else {
      return null;
    }
  }

  validateToken(): Observable<boolean> {
    // return of(true);
    return this.http.get(this.apiUrl + 'validateauth').pipe(
      map((res: any) => true),
      catchError(err => {
        return of(false);
      })
    )
  }
}
