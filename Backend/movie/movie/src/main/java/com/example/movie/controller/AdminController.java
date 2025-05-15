package com.example.movie.controller;

import com.example.movie.dto.MovieDto;
import com.example.movie.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/admin/movies")
public class AdminController {
    @Autowired
    private MovieService movieService;
    @GetMapping()
    public List<MovieDto> loadMoviesFromOMDB(@RequestParam String query){
        return movieService.loadMoviesFromOMDB(query);
    }
}
