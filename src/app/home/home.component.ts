import { Component, OnInit } from '@angular/core';

import { CandidateService } from '../_services/candidate.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vagasTotal = 0;
  constructor(public caddateSrv: CandidateService) { }

  ngOnInit(): void {
    this.vagasTotal = 0;
    this.count();
  }

  alerta() {
    alert('Ta funcionando!');
  }

  count() {
    this.caddateSrv.totalVagas().then((response: any) => {
      this.vagasTotal = response.total_vacancies;
      // for (const contador of response) {
      //   this.vagasTotal = contador.total_vacancies;
      // }

    }).catch(error => {
      alert('Não foi carregar o contador de vagas. Recarregue a página!');
    });
  }

}
