import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {CandidateService} from '../../_services/candidate.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-register-vacancy',
  templateUrl: './register-vacancy.component.html',
  styleUrls: ['./register-vacancy.component.css'],
  providers: [MessageService]
})

export class RegisterVacancyComponent implements OnInit {
  vacancy = {
    user_id: JSON.parse(localStorage.getItem('tramposdebelem')).user.id,
    title: '',
    type_vacancy: '',
    description_vacancy: ''
  };

  msg: '';
  leberarForm = false;
  loading = false;

  constructor(
    public router: Router,
    public candidateSrv: CandidateService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loading = true;

    setTimeout(() => {
      this.leberarForm = true;
      this.loading = false;
    }, 2000);
  }

  cancelar() {
    this.router.navigate(['admin/dashboard']);
  }

  salvar() {
    this.loading = true;
    this.candidateSrv.cadastrarVaga(this.vacancy).then((response: any) => {
      this.loading = false;

      if (response.status === 'error') {
        this.messageService.add(
          { severity: 'success', summary: 'Erro', detail: response.message }
        );
      }

      this.messageService.add(
        { severity: 'success', summary: 'Sucesso', detail: response.message }
      );
    }).catch(error => {
      this.loading = false;
      console.log(error);
    });
  }

}
