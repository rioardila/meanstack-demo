import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login: Login;
  token: string;
  readonly URL_API = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {
    this.login = new Login();
    this.token = '';
  }

  logIn(login: Login) {
    return this.http.post(`${this.URL_API}/login`, login);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
