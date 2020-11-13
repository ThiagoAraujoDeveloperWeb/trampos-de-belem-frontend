import { Injectable } from '@angular/core';
import { BaseService } from './common/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CandidateService extends BaseService{

  constructor(public http: HttpClient) { super(http); }

  listaVagas() {
    return super.get('vacancies/');
  }

  cadastrarAnunciante(user: any) {
    return super.post('users', user);
  }

  cadastrarVaga(vaga: any) {
    return super.post('register_vacancies', vaga);
  }
}
