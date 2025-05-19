import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Movie } from '../../models/movie-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;
  query: string = '';
  page = 0;
  size = 5;
  totalPages = 0;

  constructor(private userService: UserService, private router: Router) {
    this.loadMovies();
  }

  loadMovies(): void {
    this.userService.getMovies(this.page, this.size).subscribe((data) => {
      this.movies = data.content;
      this.totalPages = data.totalPages;
    });
  }

  search(): void {
    if (this.query.trim()) {
      this.userService
        .searchMovies(this.query, this.page, this.size)
        .subscribe((data) => {
          this.movies = data.content;
          this.totalPages = data.totalPages;
        });
    } else {
      this.loadMovies();
    }
  }

  selectMovie(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.search();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.search();
    }
  }
}
