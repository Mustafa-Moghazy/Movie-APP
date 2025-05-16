package com.example.movie.mapper;

import com.example.movie.dto.MovieDto;
import com.example.movie.entity.Movie;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-16T19:15:12+0300",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
@Component
public class MovieMapperImpl implements MovieMapper {

    @Override
    public Movie toEntity(MovieDto dto) {
        if ( dto == null ) {
            return null;
        }

        Movie movie = new Movie();

        movie.setTitle( dto.getTitle() );
        movie.setYear( dto.getYear() );
        movie.setImdbID( dto.getImdbID() );
        movie.setType( dto.getType() );
        movie.setPoster( dto.getPoster() );

        return movie;
    }

    @Override
    public MovieDto toDto(Movie movie) {
        if ( movie == null ) {
            return null;
        }

        MovieDto movieDto = new MovieDto();

        movieDto.setTitle( movie.getTitle() );
        movieDto.setYear( movie.getYear() );
        movieDto.setImdbID( movie.getImdbID() );
        movieDto.setType( movie.getType() );
        movieDto.setPoster( movie.getPoster() );

        return movieDto;
    }

    @Override
    public List<Movie> toEntityList(List<MovieDto> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Movie> list = new ArrayList<Movie>( dtoList.size() );
        for ( MovieDto movieDto : dtoList ) {
            list.add( toEntity( movieDto ) );
        }

        return list;
    }

    @Override
    public List<MovieDto> toDtoList(List<Movie> movieList) {
        if ( movieList == null ) {
            return null;
        }

        List<MovieDto> list = new ArrayList<MovieDto>( movieList.size() );
        for ( Movie movie : movieList ) {
            list.add( toDto( movie ) );
        }

        return list;
    }
}
