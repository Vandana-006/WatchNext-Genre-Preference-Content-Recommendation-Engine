package com.watchnext.entity;

import jakarta.persistence.*;

@Entity
@Table(
    name = "user_preferred_genres",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"user_id", "genre"}
    )
)
public class PreferredGenre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String genre;

    public PreferredGenre() {
    }

    public PreferredGenre(User user, String genre) {
        this.user = user;
        this.genre = genre;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getGenre() {
        return genre;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
}
