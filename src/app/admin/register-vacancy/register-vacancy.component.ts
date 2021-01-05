import { Component, OnInit } from '@angular/core';

import {CandidateService} from '../../_services/candidate.service';
import {UtilsService} from '../../_services/utils.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MessageService} from 'primeng/api';
import {DistritoService} from '../../_services/distrito.service'

@Component({
  selector: 'app-register-vacancy',
  templateUrl: './register-vacancy.component.html',
  styleUrls: ['./register-vacancy.component.css'],
  providers: [MessageService]
})

export class RegisterVacancyComponent implements OnInit {
  distrito: {
    municipio: {
      nome: ''
    }
  };
  vacancy = {
    user_id: JSON.parse(localStorage.getItem('tramposdebelem')).user.id,
    name_user_publish: JSON.parse(localStorage.getItem('tramposdebelem')).user.fullName,
    title: '',
    type_vacancy: '',
    description_vacancy: '',
    vacancy_expired: '',
    contact_information: '',
    name_company: '',
    company_website: '',
    location: '',
    about_company: ''
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
  distritos: any;
  idVacancy = null;
  publishDisabled = true;
  leberarForm = false;
  loading = false;
  editar = false;

  constructor(
    public router: Router,
    public candidateSrv: CandidateService,
    private messageService: MessageService,
    public activatedRoute: ActivatedRoute,
    public utilsSrv: UtilsService,
    private distritoSrv: DistritoService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getDistritos();

    setTimeout(() => {
      this.activatedRoute.params.subscribe(params => {
        if (params) {
          this.idVacancy = params.id
          this.leberarForm = true;
          this.loading = false;
          this.editar = true

          this.getVacancy(params);
        } else {
        }
      });
      this.leberarForm = true;
      this.loading = false;
    }, 2000);
  }

  getDistritos(){
    this.distritos = [];
    this.distritoSrv.distrito().subscribe(
      data => {
        this.distritos = data;
      }
    );
  }

  getVacancy(params: any) {
    this.loading = true;
    this.candidateSrv.buscaVaga(params.id).then((response: any) => {
      this.loading = false;
      this.vacancy.title = response.vacancy.title;
      this.vacancy.name_company = response.vacancy.name_company;
      this.vacancy.company_website = response.vacancy.company_website;
      this.vacancy.location = response.vacancy.location;
      this.vacancy.type_vacancy = response.vacancy.type_vacancy;
      this.vacancy.about_company = response.vacancy.about_company;
      this.vacancy.description_vacancy = response.vacancy.description_vacancy;
      this.vacancy.vacancy_expired = '';
      this.vacancy.contact_information = response.vacancy.contact_information;
    }).catch(error => {
      this.loading = false;
      console.log(error);
    });
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

        this.router.navigate(['admin/listar-vagas']);
      }).catch(error => {
        this.loading = false;
        console.log(error);
      });
    }
  }

  atualizar() {
    if (this.validarVaga()){
      this.vacancy.location = this.distrito.municipio.nome
      this.loading = true;
      this.candidateSrv.atualizarVaga(this.idVacancy, this.vacancy).then((response: any) => {
        this.loading = false;

        if (response.status === 'error') {
          this.messageService.add(
            { severity: 'error', summary: 'Erro', detail: response.message }
          );
        }

        this.messageService.add(
          { severity: 'success', summary: 'Sucesso', detail: response.message }
        );

        this.router.navigate(['admin/listar-vagas']);
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
    } else if (this.vacancy.name_company === '') {
      this.messageService.add(
        { severity: 'error', summary: 'Erro', detail: 'Preencha o campo NOME DA EMPRESA' }
      );
    } else if (this.vacancy.location === '') {
      this.messageService.add(
        { severity: 'error', summary: 'Erro', detail: 'Preencha o campo LOCALIZAÇÃO' }
      );
    } else if (this.vacancy.contact_information === '') {
      this.messageService.add(
        { severity: 'error', summary: 'Erro', detail: 'Preencha o campo INFORMACOES PARA CONTATO' }
      );
    } else if (this.vacancy.about_company === '') {
      this.messageService.add(
        { severity: 'error', summary: 'Erro', detail: 'Preencha o campo SOBRE A EMPRESA' }
      );
    } else {
      return true;
    }
  }

}
