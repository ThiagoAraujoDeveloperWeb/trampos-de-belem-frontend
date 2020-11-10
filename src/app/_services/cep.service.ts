import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(
    public http: HttpClient
  ) { }

  pesquisaCep(cep){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
  }
}