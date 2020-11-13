import { Injectable } from '@angular/core';
import { BaseService } from './common/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CandidateService extends BaseService{

  constructor(public http: HttpClient) { super(http); }

  totalVagas() {
    return super.get('vacancies_total');
  }

  listaDeVagas() {
    return super.get('vacancies');
  }

  buscaVaga(id) {
    return super.get(`find_vacancy/${id}`);
  }

  cadastrarAnunciante(user: any) {
    return super.post('users', user);
  }

  cadastrarVaga(vaga: any) {
    return super.post('register_vacancies', vaga);
  }

  atualizarVaga(id, vaga) {
    return super.put(`update_vacancy/${id}`, vaga);
  }
}
