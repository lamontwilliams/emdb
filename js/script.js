const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=57bb01748f78100741a8131f3044aa0a";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=57bb01748f78100741a8131f3044aa0a&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const moviesContainer = document.getElementById("movies");

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

// Build Movie Rows
function showMovies(movies) {
  moviesContainer.innerHTML = '';

  movies.forEach((movie) => {
    // Extract movie data
    const title = movie.title;
    const poster_path = movie.poster_path;
    const vote_average = Math.floor(movie.vote_average * 10) / 10;
    const overview = movie.overview;
    let badge;

    // Determine badge class based on vote_average
    if (vote_average >= 7) {
      badge = 'high';
    } else if (vote_average >= 4) {
      badge = 'mid';
    } else {
      badge = 'low';
    }

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie-col', 'mb-4'); // Changed to movie-col for responsive design
    movieEl.innerHTML = `
    <div class="card movie-card">
      <img src="${IMG_PATH + poster_path}" class="card-img-top" alt="${title}">
      <div class="card-body px-3">
          <div class="flexContainer">
            <div class="pr-2"><h5 class="card-title">${title}</h5></div>
            <div class=""><p class="card-text rating-badge ${badge}">${vote_average}</p></div>
          </div>
      <div class="overview">
          <h5>Overview</h5>
          <p>${overview}</p>
      </div>
    </div>
    `;

    moviesContainer.appendChild(movieEl);
  });
}

// Search Term Handling
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});