package com.watchnext.controller;

import com.watchnext.service.PreferredGenreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/preferences")
@CrossOrigin(origins = "http://localhost:5173")
public class PreferredGenreController {

    private final PreferredGenreService genreService;

    public PreferredGenreController(PreferredGenreService genreService) {
        this.genreService = genreService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> savePreferences(
            @PathVariable Long userId,
            @RequestBody Map<String, List<String>> request) {

        try {
            List<String> genres = genreService.savePreferences(
                    userId, request.get("genres")
            );

            return ResponseEntity.ok(Map.of(
                    "message", "Preferences saved successfully",
                    "genres", genres
            ));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );

        } catch (RuntimeException e) {
            if ("User not found".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        Map.of("message", "User not found")
                );
            }

            return ResponseEntity.internalServerError().body(
                    Map.of("message", "Unable to save preferences")
            );
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getPreferences(@PathVariable Long userId) {

        try {
            List<String> genres = genreService.getPreferences(userId);

            return ResponseEntity.ok(Map.of(
                    "userId", userId,
                    "genres", genres
            ));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    Map.of("message", "User not found")
            );
        }
    }
}
