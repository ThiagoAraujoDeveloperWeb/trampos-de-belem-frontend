import { Injectable } from '@angular/core';
import { BaseService } from './common/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DashboardService extends BaseService{

  constructor(public http: HttpClient) { super(http); }

  countVacancies() {
    return super.get('count_vacancies');
  }
}
