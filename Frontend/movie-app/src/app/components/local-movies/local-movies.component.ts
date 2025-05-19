import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { MovieDto, Movie } from '../../models/movie-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-local-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './local-movies.component.html',
  styleUrls: ['./local-movies.component.css'],
})
export class LocalMoviesComponent {
  moviesFromLocalDB: Movie[] = [];
  searchQuery: string = '';
  selectedMovies: Set<string> = new Set();
  currentPage = 0;
  pageSize = 5;
  totalPages = 0;

  constructor(private adminService: AdminService, private router: Router) {
    this.searchLocalDB();
  }

  ngOnInit() {
    this.loadMoviesFromLocalDB();
  }

  loadMoviesFromLocalDB() {
    this.adminService
      .loadMoviesFromDB(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.moviesFromLocalDB = response.content;
          this.totalPages = response.totalPages;
        },
        error: (err) => console.error('Local DB load failed', err),
      });
  }

  toggleSelect(imdbID: string) {
    this.selectedMovies.has(imdbID)
      ? this.selectedMovies.delete(imdbID)
      : this.selectedMovies.add(imdbID);
  }
  Back() {
    this.router.navigate(['admin-dashboard']);
  }

  searchLocalDB() {
    if (!this.searchQuery.trim()) {
      // If search empty, load all movies
      this.loadMoviesFromLocalDB();
      return;
    }
    this.adminService
      .searchLocalDB(this.currentPage, this.pageSize, this.searchQuery)
      .subscribe({
        next: (response) => {
          this.moviesFromLocalDB = response.content;
          this.totalPages = response.totalPages;
        },
        error: (err) => console.error('Local DB search failed', err),
      });
  }

  batchRemoveSelected(): void {
    const moviesToRemove: MovieDto[] = this.moviesFromLocalDB
      .filter((m) => this.selectedMovies.has(m.imdbID))
      .map((m) => ({
        imdbID: m.imdbID,
        Title: m.title,
        Year: m.year,
        Type: m.type,
        Poster: m.poster,
      }));

    if (moviesToRemove.length === 0) {
      alert('No movies selected for removal!');
      return;
    }

    this.adminService.batchRemove(moviesToRemove).subscribe({
      next: () => {
        alert(`${moviesToRemove.length} movies removed successfully!`);
        this.selectedMovies.clear();
        this.searchLocalDB();
      },
      error: (err) => console.error('Batch remove failed', err),
    });
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.searchLocalDB();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.searchLocalDB();
    }
  }

  
}
