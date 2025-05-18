import { Component } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { MovieDto, Movie } from '../../models/movie-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  moviesFromLocalDB: Movie[] = [];
  selectedMovies: Set<string> = new Set(); // store imdbIDs

  // Pagination for local DB
  currentPage = 0;
  pageSize = 5;
  totalMovies = 0;

  constructor(private adminService: AdminService) {}

  searchOnOMDB() {
    this.adminService.searchOMDB(this.searchQuery).subscribe(
      (movies) => {
        this.moviesFromOMDB = movies;
      },
      (error) => console.error('OMDB search failed', error)
    );
  }

  searchOnLocalDB() {
    this.adminService
      .searchLocalDB(this.currentPage, this.pageSize, this.searchQuery)
      .subscribe(
        (data) => {
          this.moviesFromLocalDB = data.content;
          this.totalMovies = data.totalElements;
        },
        (error) => console.error('Local DB search failed', error)
      );
  }

  toggleSelect(imdbID: string) {
    if (this.selectedMovies.has(imdbID)) {
      this.selectedMovies.delete(imdbID);
    } else {
      this.selectedMovies.add(imdbID);
    }
  }

  batchAddSelected() {
    // Convert selected imdbIDs to MovieDto from OMDB movies
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
        this.searchOnLocalDB(); // Refresh local DB list
      },
      (error) => console.error('Batch add failed', error)
    );
  }

  batchRemoveSelected() {
    // Collect the full MovieDto objects for selected movies from local DB by imdbID
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
        this.searchOnLocalDB(); // Refresh local DB list
      },
      error: (err) => {
        console.error('Batch remove failed', err);
      },
    });
  }
}
