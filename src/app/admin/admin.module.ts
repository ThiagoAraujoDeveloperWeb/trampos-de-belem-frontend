import {RegisterVacancyComponent} from '../admin/register-vacancy/register-vacancy.component';
import {DashboardComponent} from './dashboard/dashboard.component';

import {RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';
import {ComponentsModule} from '../_components/components.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AdminComponent} from './admin.component';
import {TooltipModule} from 'primeng/tooltip';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EditorModule} from 'primeng/editor';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    RegisterVacancyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    EditorModule,
    ButtonModule,
    RichTextEditorAllModule,
    ComponentsModule,
    TooltipModule,
    ToastModule
  ],
  exports: [AdminComponent]
})
export class AdminModule {
}
