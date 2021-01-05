import {Component, OnInit} from '@angular/core';
import {CandidateService} from '../../_services/candidate.service';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-vacancies',
  templateUrl: './list-vacancies.component.html',
  styleUrls: ['./list-vacancies.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListVacanciesComponent implements OnInit {
  vacancies = [];
  loading = false;
  position: string;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public candidateSrv: CandidateService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.listVacancies();
  }

  listVacancies() {
    this.loading = true;
    this.vacancies = [];
    this.candidateSrv.listaDeVagas().then((response: any) => {
      this.loading = false;
      for (const vacancy of response.vacancies) {
        this.vacancies.push(vacancy);
      }
    }).catch(error => {
      this.loading = false;
      console.log(error);
    });
  }

  checkVacancies(vacancy) {
    if (vacancy === true) {
      return 'vacancy-completed';
    } else {
      return 'vacancy-not-completed';
    }
  }

  editar(idVacancy) {
    this.router.navigate([`admin/registrar-vaga/`, idVacancy]);
  }

  registrarVaga(){
    this.router.navigate([`admin/registrar-vaga`]);
  }

  vacancy_filled(idVacancy, vacancy) {
    this.confirmationService.confirm({
      message: 'Essa ação não tem volta e a vaga não ficará mais visível na página inicial.',
      header: 'Deseja preencher a vaga?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        vacancy.vacancy_filled = true;

        this.loading = true;
        this.candidateSrv.atualizarVaga(idVacancy, vacancy).then((response: any) => {
          this.loading = false;

          if (response.status === 'error') {
            this.messageService.add(
              { severity: 'error', summary: 'Erro', detail: response.message }
            );
          }

          this.messageService.add(
            { severity: 'success', summary: 'Sucesso', detail: response.message }
          );

          this.listVacancies();
        }).catch(error => {
          this.loading = false;
          console.log(error);
        });
      },
      reject: () => {
        this.messageService.add({severity: 'info', summary: 'Infor', detail: 'Preenchimento de vaga não foi confirmada.'});
      },
      key: "positionDialog"
    });
  }

}
