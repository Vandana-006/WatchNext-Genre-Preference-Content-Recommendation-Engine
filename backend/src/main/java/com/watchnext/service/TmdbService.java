package com.watchnext.service;

import tools.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class TmdbService {

    @Value("${tmdb.api.base-url}")
    private String baseUrl;

    @Value("${tmdb.api.read-access-token}")
    private String readAccessToken;

    private final RestClient restClient = RestClient.create();

    public JsonNode getTrendingMovies() {

        return restClient.get()
                .uri(baseUrl + "/trending/movie/week")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + readAccessToken)
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .retrieve()
                .body(JsonNode.class);
    }
}