package com.example.movie.service;

import com.example.movie.dto.MovieDto;
import com.example.movie.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MovieService {
    Page<MovieDto> loadMoviesFromOMDB(String query, Pageable pageable);
    Movie saveToLocalDB(MovieDto movieDto);
    Page<Movie> loadMoviesFromDB(Pageable pageable);
    Movie findById(Long id);
    void delete(Long id);
    List<Movie> saveAll(List<MovieDto> movieList);
    void deleteAll(List<MovieDto> movieList);
    Movie findByImdbID(String id);
    Page<Movie> findMovieByTitle(String query, Pageable pageable);

}
