package com.example.movie.service;

import com.example.movie.dto.MovieDto;
import com.example.movie.entity.Movie;

import java.util.List;

public interface MovieService {
    List<MovieDto> loadMoviesFromOMDB(String query);
    Movie saveToLocalDB(MovieDto movieDto);
}
