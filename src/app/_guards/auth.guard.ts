import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public authSrv: AuthenticationService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // if (localStorage.getItem('tramposdebelem').role === 'user') {
    //   return true;
    // }

    // this.router.navigate(['/login-empresa']);

    // return false;

    const usuario = this.authSrv.getUser();

    if (!usuario) {
      this.router.navigate(['/login-empresa']);

      return false;
    }

    if (usuario.role === 'user') {
      return true;
    }
    // alert('Seu perfil não está autorizado a acessar essa página');

    // this.router.navigate(['/admin/home']);

    return false;
  }
}
