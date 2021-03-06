import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../models/user.model';

@Injectable()
export class UserService {

  private API: string;

  constructor(private _http: HttpClient) {
    this.API = `${environment.apiUrl}/user`;
  }

  createUser(u: User) {
    const user = new User(u.name, u.email, u.password);
    return this._http.post(this.API, user);
  }

  getUserByEmail(email) {
    const url = this.API + '/' + email;
    return this._http.get(url);
  }
}
