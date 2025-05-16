package com.example.movie.mapper;

import com.example.movie.dto.MovieDto;
import com.example.movie.entity.Movie;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MovieMapper {
Movie toEntity(MovieDto dto);
MovieDto toDto(Movie movie);
List<Movie> toEntityList(List<MovieDto> dtoList);
List<MovieDto> toDtoList(List<Movie> movieList);
}
