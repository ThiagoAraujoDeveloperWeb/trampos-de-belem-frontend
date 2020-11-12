import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

@Component({
  selector: 'app-register-vacancy',
  templateUrl: './register-vacancy.component.html',
  styleUrls: ['./register-vacancy.component.css']
})

export class RegisterVacancyComponent implements OnInit {
  vacancy = {
    title: '',
    typeVacancy: '',
    descriptionVacancy: ''
  };

  text: '';
  leberarForm = false;
  loading = false;

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;

    setTimeout(() => {
      this.leberarForm = true;
      this.loading = false;
    }, 2000);
  }

  cancelar() {
    this.router.navigate(['admin/dashboard']);
  }

}
