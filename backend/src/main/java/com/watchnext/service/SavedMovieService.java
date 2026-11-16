package com.watchnext.service;

import com.watchnext.entity.SavedMovie;
import com.watchnext.entity.User;
import com.watchnext.repository.SavedMovieRepository;
import com.watchnext.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class SavedMovieService {

    private final SavedMovieRepository savedMovieRepository;
    private final UserRepository userRepository;

    public SavedMovieService(
        SavedMovieRepository savedMovieRepository,
        UserRepository userRepository
    ) {
        this.savedMovieRepository = savedMovieRepository;
        this.userRepository = userRepository;
    }

    private String validateListType(String listType) {
        String type = listType == null ? "" : listType.trim().toUpperCase();

        if (!type.equals("WATCHLIST") && !type.equals("FAVOURITE")) {
            throw new IllegalArgumentException("Invalid list type");
        }

        return type;
    }

    @Transactional
    public void addMovie(Long userId, Long movieId, String listType) {
        String type = validateListType(listType);

        if (movieId == null || movieId <= 0) {
            throw new IllegalArgumentException("Invalid movie ID");
        }

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalStateException("User not found"));

        boolean alreadySaved =
            savedMovieRepository.existsByUser_IdAndMovieIdAndListType(
                userId, movieId, type
            );

        if (!alreadySaved) {
            savedMovieRepository.save(
                new SavedMovie(user, movieId, type)
            );
        }
    }

    @Transactional
    public void removeMovie(Long userId, Long movieId, String listType) {
        String type = validateListType(listType);

        if (!userRepository.existsById(userId)) {
            throw new IllegalStateException("User not found");
        }

        savedMovieRepository.deleteByUser_IdAndMovieIdAndListType(
            userId, movieId, type
        );
    }

    @Transactional(readOnly = true)
    public Map<String, List<Long>> getSavedMovies(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalStateException("User not found");
        }

        List<Long> watchlist = savedMovieRepository
            .findByUser_IdAndListType(userId, "WATCHLIST")
            .stream()
            .map(SavedMovie::getMovieId)
            .toList();

        List<Long> favourites = savedMovieRepository
            .findByUser_IdAndListType(userId, "FAVOURITE")
            .stream()
            .map(SavedMovie::getMovieId)
            .toList();

        return Map.of(
            "watchlist", watchlist,
            "favourites", favourites
        );
    }
}