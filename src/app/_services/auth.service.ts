import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:44353/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'Account/signin', {
      email,
      password
    }, httpOptions);
  }

  register(email: string, password: string, confirmPassword: string, Nationality: string): Observable<any> {
    debugger
    return this.http.post(AUTH_API + 'Account/signup', {
      email,
      password,
      confirmPassword,
      Nationality
    }, httpOptions);
  }
}