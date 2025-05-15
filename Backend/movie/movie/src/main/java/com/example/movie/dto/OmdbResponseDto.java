package com.example.movie.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class OmdbResponseDto {
    @JsonProperty("Search")
    private List<MovieDto> search;
    @JsonProperty("totalResults")
    private String totalResults;
    @JsonProperty("Response")
    private String response;

    public List<MovieDto> getSearch() {
        return search;
    }

    public void setSearch(List<MovieDto> search) {
        this.search = search;
    }

    public String getTotalResults() {
        return totalResults;
    }

    public void setTotalResults(String totalResult) {
        this.totalResults = totalResult;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
