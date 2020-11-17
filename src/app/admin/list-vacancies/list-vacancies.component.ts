import {Component, OnInit} from '@angular/core';
import {CandidateService} from '../../_services/candidate.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-vacancies',
  templateUrl: './list-vacancies.component.html',
  styleUrls: ['./list-vacancies.component.css'],
  providers: [MessageService]
})
export class ListVacanciesComponent implements OnInit {
  vacancies = [];
  loading = false;

  constructor(
    private messageService: MessageService,
    public candidateSrv: CandidateService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.listVacancies();
  }

  listVacancies() {
    this.loading = true;
    this.candidateSrv.listaDeVagas().then((response: any) => {
      this.loading = false;
      for (const vacancy of response.vacancies) {
        this.vacancies.push(vacancy);
      }
    }).catch(error => {
      this.loading = false;
      console.log(error);
    });
  }

  checkVacancies(vacancy) {
    if (vacancy === true) {
      return 'vacancy-completed';
    } else {
      return 'vacancy-not-completed';
    }
  }

  editar(idVacancy) {
    this.router.navigate([`admin/editar-vaga/`, idVacancy]);
  }

  registrarVaga(){
    this.router.navigate([`admin/registrar-vaga`]);
  }

  vacancy_filled(idVacancy, vacancy) {
    vacancy.vacancy_filled = true;

    this.loading = true;
    this.candidateSrv.atualizarVaga(idVacancy, vacancy).then((response: any) => {
      this.loading = false;

      if (response.status === 'error') {
        this.messageService.add(
          { severity: 'error', summary: 'Erro', detail: response.message }
        );
      }

      this.messageService.add(
        { severity: 'success', summary: 'Sucesso', detail: response.message }
      );
      console.log(response);

    }).catch(error => {
      this.loading = false;
      console.log(error);
    });
  }

}
