import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ComponentsModule} from './_components/components.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {AccordionModule} from 'primeng/accordion';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {AdminModule} from './admin/admin.module';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';

import {HttpInterceptorService} from './_services/http-interceptor.service';

import {RegisterCompanyComponent} from './register-company/register-company.component';
import {ShowVacancyComponent} from './show-vacancy/show-vacancy.component';
import {HeaderComponent} from './_components/header/header.component';
import {FooterComponent} from './_components/footer/footer.component';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';
import { EmailsCandidatesComponent } from './emails-candidates/emails-candidates.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterCompanyComponent,
    LoginComponent,
    HeaderComponent,
    VacanciesComponent,
    ShowVacancyComponent,
    FooterComponent,
    EmailsCandidatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    MatFormFieldModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    AdminModule,
    CardModule,
    ButtonModule,
    ToastModule,
    AccordionModule
  ],
  providers: [[{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}]],
bootstrap: [AppComponent]
})
export class AppModule { }
