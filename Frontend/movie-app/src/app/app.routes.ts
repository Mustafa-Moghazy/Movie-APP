import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'app', component: AppComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
