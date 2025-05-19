import { Component } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { MovieDto } from '../../models/movie-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  searchQuery: string = '';
  moviesFromOMDB: MovieDto[] = [];
  selectedMovies: Set<string> = new Set();

  constructor(private adminService: AdminService, private router: Router) {}

  searchOnOMDB() {
    this.adminService.searchOMDB(this.searchQuery).subscribe(
      (movies) => {
        this.moviesFromOMDB = movies;
      },
      (error) => console.error('OMDB search failed', error)
    );
  }

  toggleSelect(imdbID: string) {
    this.selectedMovies.has(imdbID)
      ? this.selectedMovies.delete(imdbID)
      : this.selectedMovies.add(imdbID);
  }

  batchAddSelected() {
    const moviesToAdd = this.moviesFromOMDB.filter((m) =>
      this.selectedMovies.has(m.imdbID)
    );
    if (moviesToAdd.length === 0) {
      alert('No movies selected!');
      return;
    }
    this.adminService.batchAdd(moviesToAdd).subscribe(
      (addedMovies) => {
        alert(`${addedMovies.length} movies added successfully!`);
        this.selectedMovies.clear();
      },
      (error) => console.error('Batch add failed', error)
    );
  }

  goToLocalMovies(): void {
    this.router.navigate(['/local-movies']);
  }
}
