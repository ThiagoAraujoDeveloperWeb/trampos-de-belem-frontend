import { Component, OnInit } from '@angular/core';

import { CandidateService } from '../_services/candidate.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit {
  text = '<b>precisa-se de pessoas</b> mande seu currículo.';
  loading = false;
  vacanciesForCandidates = [];
  user = {};

  constructor(public candidateSrv: CandidateService,
              public router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.cadastrarAnunciante();
    }, 2000);
  }

  cadastrarAnunciante() {
    this.candidateSrv.getVagas().then((response: any) => {
      for (const vacancy of response.vacancies) {
        this.vacanciesForCandidates.push(vacancy);
      }

    }).catch(error => {
      console.log(error);
    });
  }

  exibirVaga(idVaga) {
    this.router.navigate(['/exibir-vaga/', idVaga]);
  }

}
