package com.example.movie.controller;

import com.example.movie.entity.Movie;
import com.example.movie.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/user/movies")
public class UserController {
    @Autowired
    private MovieService movieService;

    @GetMapping("")
    public Page<Movie> loadMoviesFromDB(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size){
        Pageable pageable = PageRequest.of(page, size);
        return movieService.loadMoviesFromDB(pageable);
    }

    @GetMapping("/{movieId}")
    public Movie getMovieByID(@PathVariable Long movieId){
        return movieService.findById(movieId);
    }

    @GetMapping("/search")
    public Page<Movie> findMovieByTitle(@RequestParam String query, @RequestParam int page, @RequestParam int size){
        Pageable pageable = PageRequest.of(page, size);
        return movieService.findMovieByTitle(query, pageable);
    }
}
