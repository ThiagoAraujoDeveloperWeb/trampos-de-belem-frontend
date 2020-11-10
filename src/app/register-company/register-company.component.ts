import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  company = {
    fullName: '',
    contactPhone: '',
    email: '',
    password: '',
    nameCompany: '',
    companyDescription: '',
    companyWebsite: '',
    city: '',
    avatarCompany: null
  }

  constructor() { }

  ngOnInit(): void {
  }

}
