import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {CandidateService} from '../../_services/candidate.service';
import {UtilsService} from '../../_services/utils.service';
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
    description_vacancy: '',
    vacancy_expired: ''
  };
  pt = {
    firstDayOfWeek: 1,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
                  'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'Sem'
  };

  msg: '';
  publishDisabled = true;
  leberarForm = false;
  loading = false;

  constructor(
    public router: Router,
    public candidateSrv: CandidateService,
    private messageService: MessageService,
    public utilsSrv: UtilsService
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
    if (this.validarVaga()){
      this.loading = true;
      this.candidateSrv.cadastrarVaga(this.vacancy).then((response: any) => {
        this.loading = false;

        if (response.status === 'error') {
          this.messageService.add(
            { severity: 'error', summary: 'Erro', detail: response.message }
          );
        }

        this.messageService.add(
          { severity: 'success', summary: 'Sucesso', detail: response.message }
        );

        this.vacancy.description_vacancy = '';
        this.vacancy.type_vacancy = '';
        this.vacancy.title = '';
      }).catch(error => {
        this.loading = false;
        console.log(error);
      });
    }
  }

  validarVaga() {
    if (this.vacancy.title === '') {
      this.messageService.add(
        { severity: 'error', summary: 'Erro', detail: 'Preencha o campo TITULO' }
      );
    } else if (this.vacancy.type_vacancy === '') {
      this.messageService.add(
        { severity: 'error', summary: 'Erro', detail: 'Preencha o campo TIPO DA VAGA' }
      );
    } else if (this.vacancy.description_vacancy === '') {
      this.messageService.add(
        { severity: 'error', summary: 'Erro', detail: 'Preencha o campo DESCRIÇAO DA VAGA' }
      );
    } else if (this.vacancy.vacancy_expired === '') {
      this.messageService.add(
        { severity: 'error', summary: 'Erro', detail: 'Preencha o campo DATA PARA EXPIRAR' }
      );
    } else {
      return true;
    }
  }

}
