package com.example.movie.controller;

import com.example.movie.dto.MovieDto;
import com.example.movie.entity.Movie;
import com.example.movie.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/admin/movies")
public class AdminController {
    @Autowired
    private MovieService movieService;
    @GetMapping("/omdb/search")
    public List<MovieDto> loadMoviesFromOMDB(@RequestParam String query){
        return movieService.loadMoviesFromOMDB(query);
    }

    @GetMapping("/localdb")
    public Page<Movie> loadMoviesFromDb(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "5") int size){
        Pageable pageable = PageRequest.of(page, size);
        return movieService.loadMoviesFromDB(pageable);
    }
    
    @PostMapping("/localdb")
    public Movie saveMovieToDB(@RequestBody MovieDto movieDto){
        return movieService.saveToLocalDB(movieDto);
    }

    @DeleteMapping("localdb/{id}")
    void delete (@PathVariable Long id){
        movieService.delete(id);
    }

    @PostMapping("/batch")
    public List<Movie> addMovieList(@RequestBody List<MovieDto> movieList){
        return movieService.saveAll(movieList);
    }

    @DeleteMapping("/batch")
    public void removeMovieList(@RequestBody List<MovieDto> movieList){
        movieService.deleteAll(movieList);
    }
}
