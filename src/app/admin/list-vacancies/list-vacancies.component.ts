import {Component, OnInit} from '@angular/core';
import {CandidateService} from '../../_services/candidate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-vacancies',
  templateUrl: './list-vacancies.component.html',
  styleUrls: ['./list-vacancies.component.css']
})
export class ListVacanciesComponent implements OnInit {
  vacancies = [];
  loading = false;

  constructor(
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

}
