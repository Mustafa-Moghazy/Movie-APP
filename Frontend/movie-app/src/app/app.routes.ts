import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { LocalMoviesComponent } from './components/local-movies/local-movies.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'app', component: AppComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
  },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'local-movies', component: LocalMoviesComponent },

  {
    path: '**',
    redirectTo: 'login',
  },
];
