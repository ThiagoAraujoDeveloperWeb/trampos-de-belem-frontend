import { from } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../_services/authentication.service'


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

  constructor(
    public authSrv: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  entrar() {
    if (this.anunciante.email !== '' && this.anunciante.password !== '') {
      this.authSrv.autenticar(this.anunciante).then((response: any) => {
        this.authSrv.entrar(response);
        // this.loading = false;
      }).catch((error: any) => {
        // this.mensagemService.mensagemErro(error);
        alert(error)
        // this.loading = false;
      });
    } else {
      // this.loading = false;
      alert('Insira os dados para LOGIN');
    }
  }

}
