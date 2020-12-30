import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../_services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vacancy_filled = null;
  vacancies = null;
  loading = false;
  expired = null;

  constructor(
    public dashSrv: DashboardService
  ) { }

  ngOnInit(): void {
    this.count();
  }

  count(){
    this.dashSrv.countVacancies().then((response: any) => {
      this.expired = response.expired;
      this.vacancy_filled = response.vacancy_filled;
      this.vacancies = response.vacancies;
      this.loading = false;

    }).catch(error => {
      this.loading = false;
      console.log(error);
    });
  }

}
