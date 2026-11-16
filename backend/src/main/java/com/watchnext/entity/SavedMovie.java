package com.watchnext.entity;

import jakarta.persistence.*;

@Entity
@Table(
    name = "saved_movies",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"user_id", "movie_id", "list_type"}
    )
)
public class SavedMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "movie_id", nullable = false)
    private Long movieId;

    @Column(name = "list_type", nullable = false)
    private String listType;

    public SavedMovie() {}

    public SavedMovie(User user, Long movieId, String listType) {
        this.user = user;
        this.movieId = movieId;
        this.listType = listType;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Long getMovieId() {
        return movieId;
    }

    public String getListType() {
        return listType;
    }
}