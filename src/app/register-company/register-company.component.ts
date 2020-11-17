import { Component, OnInit } from '@angular/core';

import { CandidateService } from '../_services/candidate.service'
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css'],
  providers: [MessageService]
})
export class RegisterCompanyComponent implements OnInit {
  company = {
    fullName: '',
    email: '',
    password: ''
  };

  loading = false;

  constructor(public candidateSrv: CandidateService,
              private messageService: MessageService,
              public router: Router) { }

  ngOnInit(): void {
  }

  cadastrarAnunciante() {
    if (this.validarVaga()) {
      this.loading = true;
      this.candidateSrv.cadastrarAnunciante(this.company).then((response: any) => {
        this.loading = false;
        if (response.status === 'cadastrado') {
          this.messageService.add(
            { severity: 'success', summary: 'Cadastro Feito!', detail: response.message }
          );
          this.router.navigate(['login-empresa']);
        }

        this.messageService.add(
          { severity: 'error', summary: 'Erro', detail: response.error }
        );

      }).catch(error => {
        this.loading = false;
        this.messageService.add(
          { severity: 'error', summary: 'Erro', detail: error.error }
        );
      });
    }
  }

  validarVaga() {
    if (this.company.fullName === '') {
      this.messageService.add(
        { severity: 'error', summary: 'Erro', detail: 'Preencha o campo NOME COMPLETO' }
      );
      return false;
    } else if (this.company.email === '') {
      this.messageService.add(
        { severity: 'error', summary: 'Erro', detail: 'Preencha o campo EMAIL' }
      );
      return false;
    } else if (this.company.password === '') {
      this.messageService.add(
        { severity: 'error', summary: 'Erro', detail: 'Preencha o campo SENHA' }
      );
      return false;
    } else {
      return true;
    }
  }

}
