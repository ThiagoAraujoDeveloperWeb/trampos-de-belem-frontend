import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../_services/candidate.service'

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-emails-candidates',
  templateUrl: './emails-candidates.component.html',
  styleUrls: ['./emails-candidates.component.css'],
  providers: [MessageService]
})
export class EmailsCandidatesComponent implements OnInit {
  loading = false;
  erro = false;
  msg = '';

  candidate = {
    name: '',
    email: ''
  }

  constructor(
    private canddateSrv: CandidateService,
    private messageService: MessageService
    ) {}

  ngOnInit(): void {
  }

  enviar(){
    console.log('Candidate:', this.candidate)

    this.loading = true;
    setTimeout(() => {
      if (this.candidate.email !== '' && this.candidate.name !== '') {
        this.canddateSrv.emailsAlert(this.candidate).then((response: any) => {
          this.loading = false;
          this.messageService.add({severity:'success', summary:'Email cadastrado com sucesso!', detail:'Você receberá emails assim que novas vagas forem sendo publicadas, Boa sorte!'});

          this.limpar();
        }).catch((error: any) => {
          this.loading = false;
          this.erro = true;
          this.msg = error.error;

          this.messageService.add({severity:'error', summary: 'Erro ao cadastrar e-mail', detail: error.error});
        });
      } else {
        this.loading = false;
        this.erro = true;
        this.msg = 'Insira seu email para notificações';
        this.messageService.add({severity:'error', summary: 'Nenhum campo preenchido', detail: 'Insira seu email para receber notificações'});
      }
    }, 1000);
  }

  limpar(){
    this.candidate.name = '';
    this.candidate.email = '';
  }

}
