import { Component, OnInit } from '@angular/core';

import { CandidateService } from '../_services/candidate.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  company = {
    fullName: null,
    contactPhone: null,
    email: null,
    password: null,
    nameCompany: null,
    companyDescription: null,
    companyWebsite: null,
    city: null
  }

  loading = false;

  constructor(public candidateSrv: CandidateService,
              public router: Router) { }

  ngOnInit(): void {
  }

  cadastrarAnunciante() {
    this.loading = true;
    this.candidateSrv.cadastrarAnunciante(this.company).then((response: any) => {
      this.loading = false;
      if (response.status === 'cadastrado') {
        this.router.navigate(['login-empresa']);
      }

      console.log('Anunciante: ', response);

  }).catch(error => {
    this.loading = false;
    console.log(error);
  });
  }

}
