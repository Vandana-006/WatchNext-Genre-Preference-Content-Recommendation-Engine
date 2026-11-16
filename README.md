# 🎬 WatchNext – Genre Preference Content Recommendation Engine

**Discover what to watch next, based on your interests, mood, and viewing preferences.**

WatchNext is a personalized movie discovery and recommendation web application designed to make content selection easier and more engaging. It combines genre preferences, mood-based discovery, personalized recommendations, and movie-saving functionality in one interactive platform.

---

## ✨ Key Features

### 1. Personalized Dashboard
- Explore movie recommendations through an interactive dashboard.
- Discover trending movies and relevant content.
- Access personalized movie suggestions.

### 2. MoodSync
- Explore movies based on your current mood.
- Find content that matches your preferred viewing experience.

### 3. WhyThis
- Understand why a movie is recommended.
- Get insights into the factors influencing movie suggestions.

### 4. TasteDNA
- Explore your movie preferences and genre interests.
- Build a personalized content discovery experience.

### 5. Watchlist & Favorites
- Save movies for later.
- Maintain your personal movie collection.
- Access saved movies through the application.

### 6. User Authentication & Preferences
- User login and registration.
- Manage preferred genres.
- Store personalized preferences.

---

## 🛠️ Tech Stack

| Component | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Backend | Java, Spring Boot |
| Database | MySQL |
| API Integration | TMDB API |
| Styling | CSS |
| Development Tools | VS Code, MySQL Workbench, Maven, Git |

---

## 🏗️ Project Architecture

WatchNext follows a frontend–backend architecture.

**Frontend (React + Vite)**
- User interface
- Dashboard and discovery screens
- User interactions and API requests

**Backend (Spring Boot)**
- REST API endpoints
- Authentication and user-related operations
- Genre preference management
- Movie data integration
- Watchlist and saved movie operations

**Database (MySQL)**
- User information
- Preferred genres
- Saved movie information

**External API (TMDB)**
- Movie information
- Trending movie data
- Movie discovery

---

## 📂 Project Structure

```text
WatchNext/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/watchnext/
│   │   │   └── resources/
│   │   └── test/
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

Follow these steps to run WatchNext locally.

### Prerequisites

- Node.js and npm
- Java Development Kit (JDK 21 or compatible)
- MySQL Server
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Vandana-006/WatchNext-Genre-Preference-Content-Recommendation-Engine.git
```

```bash
cd WatchNext
```

### 2. Configure the Database

- Start your MySQL server.
- Create the required database: `watchnext_db`.
- Configure the database connection in the backend's local configuration.
- Set the required database credentials and TMDB API access configuration locally.

**Important:** Never commit database passwords, API tokens, or other sensitive credentials to GitHub.

### 3. Run the Backend

Open a terminal:

```bash
cd backend
```

On Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs on:

`http://localhost:8080`

### 4. Run the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

`http://localhost:5173`

---

## 🔍 Recommendation Approach

WatchNext focuses on personalized content discovery through:

- Genre preference matching
- Mood-based movie discovery
- Movie information and trending content
- Preference-driven recommendations

The current recommendation experience uses application-level matching and filtering logic rather than claiming a separately trained machine-learning model.

---

## 🚀 Future Enhancements

- Advanced hybrid recommendation algorithms.
- Collaborative filtering using user interaction patterns.
- Improved personalization based on viewing history.
- More detailed recommendation explanations.
- Enhanced user analytics and preference insights.

---

## 🎯 Project Objective

The objective of WatchNext is to improve the movie discovery experience by reducing the time users spend deciding what to watch and providing a more personalized, interactive way to explore entertainment content.

---

## 👩‍💻 Developed By

**Vandana**

Computer Science and Engineering Student

GitHub: [Vandana-006](https://github.com/Vandana-006)

Project Repository: [WatchNext](https://github.com/Vandana-006/WatchNext-Genre-Preference-Content-Recommendation-Engine)

---

⭐ If you find this project interesting, consider giving the repository a star!
