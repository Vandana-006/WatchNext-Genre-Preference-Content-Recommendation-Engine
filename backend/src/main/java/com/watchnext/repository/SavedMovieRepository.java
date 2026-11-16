package com.watchnext.repository;

import com.watchnext.entity.SavedMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SavedMovieRepository extends JpaRepository<SavedMovie, Long> {

    List<SavedMovie> findByUser_IdAndListType(Long userId, String listType);

    boolean existsByUser_IdAndMovieIdAndListType(
        Long userId, Long movieId, String listType
    );

    void deleteByUser_IdAndMovieIdAndListType(
        Long userId, Long movieId, String listType
    );
}