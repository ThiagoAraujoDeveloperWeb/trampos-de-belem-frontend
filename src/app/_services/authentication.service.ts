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
    return super.post('usuarios/autenticar/', usuario)
  }

  entrarAdmin(usuario) {
    localStorage.setItem('viverbelem', JSON.stringify(usuario));
    this.router.navigate(['admin/lista-empreendimento']);
  }

  logout() {
    localStorage.removeItem('viverbelem');
    this.router.navigate(['login-admin']);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('viverbelem'));
  }
}
