import { Component, OnInit } from '@angular/core';

import {DatePipe} from '@angular/common';
import {CandidateService} from '../_services/candidate.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-show-vacancy',
  templateUrl: './show-vacancy.component.html',
  styleUrls: ['./show-vacancy.component.css'],
  providers: [MessageService, DatePipe]
})
export class ShowVacancyComponent implements OnInit {
  loading = false;
  vacancy: any;
  liberaCard = false;

  constructor(
    private messageService: MessageService,
    public candidateSrv: CandidateService,
    public activatedRoute: ActivatedRoute,
    public datePipe: DatePipe,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.liberaCard = true;
          this.candidateSrv.getVaga(params.id).then((response: any) => {
            this.vacancy = response.vacancy;
          }).catch(error => {
            this.loading = false;
            console.log(error);
          });
        }, 2000);
      } else {
      }
    });
  }

}
