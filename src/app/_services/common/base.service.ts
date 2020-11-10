import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(public http: HttpClient) { }

  get(url: string, options?): Promise<any> {
    return this.http.get(`${ environment.api.url }${url}`, options).toPromise();
  }

  post(url: string, body: any, options?): Promise<any> {
    return this.http.post(`${ environment.api.url }${url}`, body, options).toPromise();
  }

  put(url: string, body: any, options?): Promise<any> {
    return this.http.put(`${ environment.api.url }${url}`, body, options).toPromise();
  }

  download(url: string, options?): Promise<any> {
    let header = new HttpHeaders();
    header = header.append('Accept', `application/pdf`);
    options.headers = header;
    options.responseType = 'blob';
    return this.http.get(`${ environment.api.url }${url}`, options).toPromise();
  }
}
