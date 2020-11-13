import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {CandidateService} from '../../_services/candidate.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-edit-vacancy',
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.css'],
  providers: [MessageService, DatePipe]
})
export class EditVacancyComponent implements OnInit {
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

  leberarForm = false;
  loading = false;
  idVacancy = null;

  constructor(
    private messageService: MessageService,
    public candidateSrv: CandidateService,
    public activatedRoute: ActivatedRoute,
    public datePipe: DatePipe,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.activatedRoute.params.subscribe(params => {
        if (params) {
          this.leberarForm = true;
          this.loading = false;
          this.idVacancy = params.id;
          this.getVacancy(params);
        } else {
        }
      });
    }, 2000);
  }

  getVacancy(params: any) {
    this.loading = true;
    this.candidateSrv.buscaVaga(params.id).then((response: any) => {
      this.loading = false;
      this.vacancy.title = response.vacancy.title;
      this.vacancy.type_vacancy = response.vacancy.type_vacancy;
      this.vacancy.description_vacancy = response.vacancy.description_vacancy;
      this.vacancy.vacancy_expired = this.datePipe.transform(response.vacancy_expired, 'dd/MM/yyyy');
    }).catch(error => {
      this.loading = false;
      console.log(error);
    });
  }

  atualizar() {
    this.loading = true;
    this.candidateSrv.atualizarVaga(this.idVacancy, this.vacancy).then((response: any) => {
      this.loading = false;

      if (response.status === 'error') {
        this.messageService.add(
          { severity: 'success', summary: 'Erro', detail: response.message }
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

  cancelar() {
    this.router.navigate(['admin/dashboard']);
  }

}
