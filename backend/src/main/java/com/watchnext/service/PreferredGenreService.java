package com.watchnext.service;

import com.watchnext.entity.PreferredGenre;
import com.watchnext.entity.User;
import com.watchnext.repository.PreferredGenreRepository;
import com.watchnext.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PreferredGenreService {

    private final PreferredGenreRepository genreRepository;
    private final UserRepository userRepository;

    private static final List<String> ALLOWED_GENRES = List.of(
        "Sci-Fi", "Thriller", "Drama", "Action",
        "Adventure", "Crime", "Comedy"
    );

    public PreferredGenreService(
            PreferredGenreRepository genreRepository,
            UserRepository userRepository) {
        this.genreRepository = genreRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public List<String> savePreferences(Long userId, List<String> genres) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (genres == null) {
            throw new IllegalArgumentException("Genre list is required");
        }

        List<String> validatedGenres = genres.stream()
                .filter(genre -> genre != null)
                .map(String::trim)
                .filter(ALLOWED_GENRES::contains)
                .distinct()
                .toList();

        if (validatedGenres.size() != genres.size()) {
            throw new IllegalArgumentException("Invalid or duplicate genres supplied");
        }

        genreRepository.deleteByUser_Id(userId);

        List<PreferredGenre> preferences = validatedGenres.stream()
                .map(genre -> new PreferredGenre(user, genre))
                .toList();

        genreRepository.saveAll(preferences);

        return validatedGenres;
    }

    public List<String> getPreferences(Long userId) {

        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }

        return genreRepository.findByUser_Id(userId)
                .stream()
                .map(PreferredGenre::getGenre)
                .toList();
    }
}
