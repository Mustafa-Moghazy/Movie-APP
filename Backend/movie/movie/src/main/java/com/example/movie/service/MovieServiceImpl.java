package com.example.movie.service;

import com.example.movie.dto.MovieDto;
import com.example.movie.dto.OmdbResponseDto;
import com.example.movie.entity.Movie;
import com.example.movie.exception.MovieAlreadyExistException;
import com.example.movie.exception.MovieNotFoundException;
import com.example.movie.mapper.MovieMapper;
import com.example.movie.repository.MovieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private final Logger logger = LoggerFactory.getLogger(MovieServiceImpl.class);

    @Override
    public List<MovieDto> loadMoviesFromOMDB(String query) {
        logger.info("fetching movies from OMDBAPI with query : {}", query);

        String url = "https://www.omdbapi.com/?s=" + query + "&apikey=40ebffc6";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<OmdbResponseDto> result = restTemplate.getForEntity(url, OmdbResponseDto.class);
        OmdbResponseDto response = result.getBody();
        if(response != null && response.getResponse().equals("True")) {
            return response.getSearch();
        }

        logger.error("OMDBAPI Return Empty Response for query : {}", query);
        throw new MovieNotFoundException("No Response Data Found with query : " + query);
    }

    @Override
    public Movie saveToLocalDB(MovieDto movieDto) {
        logger.info("Saving Movie into database {} : ", movieDto.getTitle());
        Optional<Movie> existingMovie = movieRepo.findMovieByImdbID(movieDto.getImdbID());
        if(!existingMovie.isEmpty()){
            throw new MovieAlreadyExistException("Movie with ImdbID : " + movieDto.getImdbID() +" Was Added before");
        }
        Movie movie = mapper.toEntity(movieDto);
        return movieRepo.save(movie);
    }

    @Override
    public Page<Movie> loadMoviesFromDB(Pageable pageable) {
        logger.info("Loading Movies From Database...");
        return movieRepo.findAll(pageable);
    }

    @Override
    public Movie findById(Long id) {
        logger.info("Finding movie by ID: {}", id);
        Optional<Movie> movie = movieRepo.findById(id);
        if(movie.isEmpty()){
            logger.warn("No Movies Found with Id : {}", id);
            throw new MovieNotFoundException("Movie Not Found!! ID : " + id);
        }
        logger.info("Return Movie with id : {}", id);
        return movie.get();
    }

    @Override
    public void delete(Long id) {
        logger.info("deleting Movie with id : {}", id);
        Movie movie = findById(id);
        movieRepo.delete(movie);
        logger.info("Movie with id : {} deleted", id);
    }

    @Override
    public List<Movie> saveAll(List<MovieDto> movieList) {
        logger.info("saving list of movies into local database...");
        List<Movie> newMovieList = movieList.stream()
                .filter(movieDto -> movieRepo.findMovieByImdbID(movieDto.getImdbID()).isEmpty() )
                .map(movieDto -> mapper.toEntity(movieDto))
                .collect(Collectors.toList());
        return movieRepo.saveAll(newMovieList);
    }

    @Override
    public void deleteAll(List<MovieDto> movieList) {
        logger.info("deleting list of movies from local database...");
        List<Movie> movieListToDelete = movieList.stream()
                .map(movieDto ->  findByImdbID(movieDto.getImdbID()))
                .collect(Collectors.toList());
        movieRepo.deleteAll(movieListToDelete);
    }

    @Override
    public Movie findByImdbID(String id) {
        logger.info("Finding movie by ImdbID : {}", id);
        Optional<Movie> movie = movieRepo.findMovieByImdbID(id);
        if(movie.isEmpty()){
            logger.warn("No movies found with ImdbId: {}", id);
            throw new MovieNotFoundException("Movie Not Found with ImdbId : " + id);
        }
        return movie.get();
    }

    @Override
    public Page<Movie> findMovieByTitle(String query, Pageable pageable) {
        logger.info("Finding movies by title : {}", query);
        return movieRepo.findMovieByTitleContainingIgnoreCase(query, pageable);
    }


}
