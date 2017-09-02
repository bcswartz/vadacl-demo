import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CustomerProfileComponent } from './views/customer-profile/customer-profile.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'customer-profile', component: CustomerProfileComponent }
];

export const routing = RouterModule.forRoot( appRoutes );


