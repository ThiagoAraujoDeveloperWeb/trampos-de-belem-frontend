import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  constructor(
    public http: HttpClient
  ) { }

  // pesquisaCep(cep){
  //   return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
  // }

  distrito(){
    return this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/PA/distritos`);
  }
}
