import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Movie, MovieDto } from '../../models/movie-model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin/movies';

  constructor(private http: HttpClient) {}

  searchOMDB(query: string): Observable<MovieDto[]> {
    return this.http.get<MovieDto[]>(`${this.apiUrl}/omdb/search`, {
      params: new HttpParams().set('query', query),
    });
  }

  searchLocalDB(
    page: number,
    size: number,
    query?: string
  ): Observable<{ content: Movie[]; totalElements: number }> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (query) params = params.set('title', query);
    return this.http.get<{ content: Movie[]; totalElements: number }>(
      `${this.apiUrl}/localdb`,
      { params }
    );
  }

  batchAdd(movies: MovieDto[]): Observable<Movie[]> {
    return this.http.post<Movie[]>(`${this.apiUrl}/batch`, movies);
  }

  batchRemove(movies: MovieDto[]): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/batch`, { body: movies });
  }
}
