import { Injectable } from '@angular/core';
import {BaseService} from './common/base.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  constructor(public http: HttpClient,
              public router: Router
  ) { super(http); }

  autenticar(usuario) {
    return super.post('login', usuario);
  }

  entrar(usuario) {
    localStorage.setItem('tramposdebelem', JSON.stringify(usuario));
    this.router.navigate(['admin/dashboard']);
  }

  logout() {
    localStorage.removeItem('tramposdebelem');
    this.router.navigate(['login-empresa']);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('tramposdebelem'));
  }
}
