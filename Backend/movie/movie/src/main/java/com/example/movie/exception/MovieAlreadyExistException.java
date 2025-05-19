package com.example.movie.exception;

public class MovieAlreadyExistException extends RuntimeException{
    public MovieAlreadyExistException(String message){
        super(message);
    }

}
