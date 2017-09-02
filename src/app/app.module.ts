import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from './app.routing'

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { CustomerProfileComponent } from './views/customer-profile/customer-profile.component';

import { Vadacl as VadaclService } from 'vadacl';
import { AddressComponent } from './views/address/address.component';
import { AdminProfileComponent } from './views/admin-profile/admin-profile.component';
import { CompanyComponent } from './views/company/company.component';
import { CompanyNameComponent } from './views/company-name/company-name.component';
import { ExcursionPackageComponent } from './views/excursion-package/excursion-package.component';
import { PatientComponent } from './views/patient/patient.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerProfileComponent,
    AddressComponent,
    AdminProfileComponent,
    CompanyComponent,
    CompanyNameComponent,
    ExcursionPackageComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    VadaclService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
