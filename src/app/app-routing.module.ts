import { from } from 'rxjs';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterCompanyComponent } from './register-company/register-company.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RegisterVacancyComponent } from './admin/register-vacancy/register-vacancy.component';
import { ListVacanciesComponent } from './admin/list-vacancies/list-vacancies.component';
import { EditVacancyComponent } from './admin/edit-vacancy/edit-vacancy.component';
import { ShowVacancyComponent } from './show-vacancy/show-vacancy.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login-empresa', component: LoginComponent },
  { path: 'cadastro-empresa', component: RegisterCompanyComponent },
  { path: 'exibir-vaga/:id', component: ShowVacancyComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children:
    [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'registrar-vaga', component: RegisterVacancyComponent },
      { path: 'listar-vagas', component: ListVacanciesComponent },
      { path: 'editar-vaga/:id', component: EditVacancyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
