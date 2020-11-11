import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../_services/authentication.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showFiller = false;
  constructor(public authSrv: AuthenticationService) { }

  ngOnInit(): void {
  }

  sair() {
    this.authSrv.logout();
  }

}
