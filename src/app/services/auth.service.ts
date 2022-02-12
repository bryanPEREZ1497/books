import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {
  }

  get token(): string | null {
    return JSON.parse(String(localStorage.getItem('token')));
  }

  set token(value: string | undefined | null) {
    localStorage.setItem('token', JSON.stringify(value));
  }

  get user(): UserModel {
    return JSON.parse(String(localStorage.getItem('user')));
  }

  set user(user: UserModel | undefined | null) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeLogin() {
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    localStorage.removeItem('roles');
    localStorage.removeItem('role');
    localStorage.removeItem('permissions');
    localStorage.removeItem('keepSession');
  }
}
