# 🎬 Movie Management App (Spring Boot + Angular)

This is a full-stack web application for browsing and managing movies. It integrates with the [OMDB API](https://www.omdbapi.com/) and supports two types of users: `ADMIN` and `USER`. 

- **Admins** can search OMDB, save/remove movies in the local database, and perform batch operations.
- **Users** can browse and search movies saved in the local database.
- The app uses **Spring Boot** for the backend and **Angular 17+** for the frontend.
- Authentication is handled using **JWT tokens**, with **role-based access control**.

---

## 🛠 Tech Stack

### Backend:
- Java 17+
- Spring Boot
- Spring Security with JWT
- In-memory Authentication (for testing)
- OMDB API integration
  
### Frontend:
- Angular 17+ with Standalone Components
- JWT token handling (login/auth guard)
- Admin/User dashboards

---
## 🚀 Getting Started
### clone the project
```bash
 git clone https://github.com/Mustafa-Moghazy/Movie-APP.git
```

##  Running the App

## 1️ -> Backend

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```
 **Update Database Configuration**
   #### Edit the application.properties file to configure your database connection:
   ```bash
   spring.datasource.url=jdbc:mysql://localhost:3306/movie_db
   spring.datasource.username=yourUsername
   spring.datasource.password=yourPassword
   ```
### The backend runs at:
```bash
http://localhost:8080
 ```

## 2 -> Frontend Setup (Angular)
```bash
cd frontend
npm install
ng serve
```
### The Frontend runs at:
```bash
http://localhost:4200
 ```

### 🧪 Users for Testing
 These are the in-memory users configured in the backend
 | User  | Password        | Role     |
 |--------|----------------|----------|
 | `moghz` | `moghz123`    | `ADMIN` |
 | `m8z` | `m8z123`    | `USER` |

### Backend Endpoints

| Role   | Endpoint                                | Description                                 |
|--------|------------------------------------------|---------------------------------------------|
| Public | `/api/auth/login`                       | Login and receive JWT token                 |
| Admin  | `/api/admin/movies/omdb/search`         | Search movies from OMDB API                 |
| Admin  | `/api/admin/movies/localdb`             | List all movies from local DB (paginated)   |
| Admin  | `/api/admin/movies/localdb/search`      | Search movies by title (local DB)           |
| Admin  | `/api/admin/movies/localdb` (POST)      | Save a movie to the DB                      |
| Admin  | `/api/admin/movies/localdb/{id}` (DEL)  | Delete a movie by ID                        |
| Admin  | `/api/admin/movies/batch` (POST/DEL)    | Batch add/remove movies                     |
| User   | `/api/user/movies`                      | Browse local DB movies (paginated)          |
| User   | `/api/user/movies/search`               | Search movies by title                      |
| User   | `/api/user/movies/{movieId}`            | Get movie details                           |

---




## 👨‍💻 Author
### Developed by Moghazy 👨‍💻
### Feel free to contribute or suggest improvements!


