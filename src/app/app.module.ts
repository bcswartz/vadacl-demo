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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerProfileComponent,
    AddressComponent
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
