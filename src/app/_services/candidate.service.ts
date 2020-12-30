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

  getVaga(id) {
    return super.get(`find_vacancy_public/${id}`);
  }

  getVagas() {
    return super.get(`vacancies_for_candates`);
  }

  getUser(idUser) {
    return super.get(`get_advertiser/${idUser}`);
  }

  cadastrarAnunciante(user: any) {
    return super.post('users', user);
  }

  cadastrarVaga(vacancy: any) {
    return super.post('register_vacancies', vacancy);
  }

  atualizarVaga(id, vacancy) {
    return super.put(`update_vacancy/${id}`, vacancy);
  }

  emailsAlert(candidate: any){
    return super.post('emails_alerts', candidate);
  }

  // vacancyFilled(idVacancy, vacancy) {
  //   return super.put(`vacancy_filled/${idVacancy}`, vacancy);
  // }
}
