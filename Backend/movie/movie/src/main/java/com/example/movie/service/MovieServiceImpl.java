package com.example.movie.service;

import com.example.movie.dto.MovieDto;
import com.example.movie.dto.OmdbResponseDto;
import com.example.movie.entity.Movie;
import com.example.movie.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService{

    @Autowired
    private MovieRepository movieRepo;
    @Override
    public List<MovieDto> loadMoviesFromOMDB(String query) {
        String url = "https://www.omdbapi.com/?s=" + query + "&apikey=40ebffc6";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<OmdbResponseDto> result = restTemplate.getForEntity(url, OmdbResponseDto.class);
        OmdbResponseDto response = result.getBody();
        if(response != null && response.getResponse().equals("True")) {
            return response.getSearch();
        }
        throw new RuntimeException("No Response Data Found");
    }

    @Override
    public Movie saveToLocalDB(MovieDto movieDto) {
        Movie movie = new Movie();
        movie.setTitle(movieDto.getTitle());
        movie.setYear(movieDto.getYear());
        movie.setType(movieDto.getType());
        movie.setImdbID(movieDto.getImdbID());
        movie.setPoster(movieDto.getPoster());
        return movieRepo.save(movie);
    }
}
