import { from } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  anunciante = {
    email: '',
    password: ''
  };
  loading = false;
  erro = false;
  msg = '';

  constructor(
    public authSrv: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  entrar() {
    this.loading = true;
    setTimeout(() => {
      if (this.anunciante.email !== '' && this.anunciante.password !== '') {
        this.authSrv.autenticar(this.anunciante).then((response: any) => {
          this.loading = false;
          this.authSrv.entrar(response);

          if (response.status === 403) {
            this.erro = true;
            this.loading = false;
            this.msg = response.error;
          }
        }).catch((error: any) => {
          this.loading = false;
          this.erro = true;
          this.msg = error.error;
        });
      } else {
        this.loading = false;
        this.erro = true;
        this.msg = 'Insira os dados para LOGIN';
      }
    }, 1000);
  }

}
