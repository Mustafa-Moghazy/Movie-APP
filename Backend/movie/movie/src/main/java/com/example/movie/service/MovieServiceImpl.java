package com.example.movie.service;

import com.example.movie.dto.MovieDto;
import com.example.movie.dto.OmdbResponseDto;
import com.example.movie.entity.Movie;
import com.example.movie.mapper.MovieMapper;
import com.example.movie.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieServiceImpl implements MovieService{

    @Autowired
    private MovieRepository movieRepo;
    @Autowired
    private MovieMapper mapper;
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
        Movie movie = mapper.toEntity(movieDto);
        return movieRepo.save(movie);
    }

    @Override
    public Page<Movie> loadMoviesFromDB(Pageable pageable) {
        return movieRepo.findAll(pageable);
    }

    @Override
    public Movie findById(Long id) {
        Optional<Movie> movie = movieRepo.findById(id);
        if(movie.isEmpty()){
            throw new RuntimeException("Movie Not Found!!");
        }
        return movie.get();
    }

    @Override
    public void delete(Long id) {
        Movie movie = findById(id);
        movieRepo.delete(movie);
    }

    @Override
    public List<Movie> saveAll(List<MovieDto> movieList) {
        List<Movie> newMovieList = mapper.toEntityList(movieList);
        return movieRepo.saveAll(newMovieList);
    }

    @Override
    public void deleteAll(List<MovieDto> movieList) {
        List<Movie> movieListToDelete = movieList.stream()
                .map(movieDto ->  findByImdbID(movieDto.getImdbID()))
                .collect(Collectors.toList());
        movieRepo.deleteAll(movieListToDelete);
    }

    @Override
    public Movie findByImdbID(String id) {
        Optional<Movie> movie = movieRepo.findMovieByImdbID(id);
        if(movie.isEmpty()){
            throw new RuntimeException("Movie Not Found!");
        }
        return movie.get();
    }


}
