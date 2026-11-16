package com.watchnext.controller;

import com.watchnext.service.SavedMovieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/saved-movies")
@CrossOrigin(origins = "http://localhost:5173")
public class SavedMovieController {

    private final SavedMovieService savedMovieService;

    public SavedMovieController(SavedMovieService savedMovieService) {
        this.savedMovieService = savedMovieService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getSavedMovies(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(
                savedMovieService.getSavedMovies(userId)
            );
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/{userId}/{listType}/{movieId}")
    public ResponseEntity<?> addMovie(
        @PathVariable Long userId,
        @PathVariable String listType,
        @PathVariable Long movieId
    ) {
        try {
            savedMovieService.addMovie(userId, movieId, listType);
            return ResponseEntity.ok(
                Map.of("message", "Movie saved successfully")
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{userId}/{listType}/{movieId}")
    public ResponseEntity<?> removeMovie(
        @PathVariable Long userId,
        @PathVariable String listType,
        @PathVariable Long movieId
    ) {
        try {
            savedMovieService.removeMovie(userId, movieId, listType);
            return ResponseEntity.ok(
                Map.of("message", "Movie removed successfully")
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", e.getMessage()));
        }
    }
}