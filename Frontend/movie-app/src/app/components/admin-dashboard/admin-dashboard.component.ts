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

  currentPage = 0;
  pageSize = 5;
  totalPages = 0;

  constructor(private adminService: AdminService, private router: Router) {}

  searchOnOMDB(page: number = 0): void {
    this.currentPage = page;
    this.adminService
      .searchOMDB(this.searchQuery, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.moviesFromOMDB = response.content;
          this.totalPages = response.totalPages;
        },
        error: (error) => console.error('OMDB search failed', error),
      });
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
    this.adminService.batchAdd(moviesToAdd).subscribe({
      next: (addedMovies) => {
        alert(`${addedMovies.length} movies added successfully!`);
        this.selectedMovies.clear();
      },
      error: (error) => console.error('Batch add failed', error),
    });
  }

  goToLocalMovies(): void {
    this.router.navigate(['/local-movies']);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.searchOnOMDB(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.searchOnOMDB(this.currentPage + 1);
    }
  }
}
