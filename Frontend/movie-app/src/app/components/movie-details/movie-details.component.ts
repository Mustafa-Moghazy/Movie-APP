import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie-model';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getMovieById(id).subscribe((movie) => {
      this.movie = movie;
    });
  }
  Back() {
    this.router.navigate(['/user-dashboard']);
  }
}
