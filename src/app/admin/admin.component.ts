import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../_services/authentication.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showFiller = false;
  visibleSidebar1 = false;
  items: MenuItem[];

  constructor(public authSrv: AuthenticationService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Cadastrar Vaga',
        icon: 'pi pi-pw pi-file',
        routerLink: 'registrar-vaga'
      },
      {
        label: 'Vagas Cadastradas',
        icon: 'pi pi-pw pi-list',
        routerLink: 'listar-vagas'
      }
    ]
  }

  sair() {
    this.authSrv.logout();
  }

}
