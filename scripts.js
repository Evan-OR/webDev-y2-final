let genres = [];
let moviesList = [];

const setMoveData = async () => {
  let search = document.getElementById('searchBar').value;

  const movieereq = await fetch(
    'https://api.themoviedb.org/3/movie/11324?api_key=94501fa08c614734eea69931d25cb54a&language=en-US'
  );
  const moviedata = await movieereq.json();
  console.log(moviedata);

  // Get Genres
  const req = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=94501fa08c614734eea69931d25cb54a&language=en-US'
  );
  const data = await req.json();
  genres = data.genres;

  // Get Movies
  const moviesReq = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=94501fa08c614734eea69931d25cb54a&language=en-US&query=${search}&page=1&include_adult=false`
  );
  const moviesData = await moviesReq.json();
  moviesList = moviesData.results;
  console.log(moviesList);

  setInfo();
};

const setInfo = () => {
  const displayElement = document.getElementById('display');
  displayElement.innerHTML = '';
  moviesList.forEach((movie) => {
    displayElement.innerHTML += `
    <div class="movieDisplay">
      <img draggable="false" class="moviePoster" src="https://image.tmdb.org/t/p/w92/${movie.poster_path}"></img>

      <div class="movieInfoWrapper">
        <div class="movieTitle">${movie.title}</div>
        <div class="movieRatingWrapper">${generateMovieRating(movie.vote_average)}</div>
        <div class="movieGenres">${getGenresAsString(movie.genre_ids)}</div>
      </div>
    </div>
  `;
  });
};

const moneyFormat = (num) => {
  return new Intl.NumberFormat('ie-IE', { style: 'currency', currency: 'EUR' }).format(num);
};

const getGenresAsString = (genreIDs) => {
  let genresAsString = [];

  genreIDs.forEach((gID) => {
    for (genreObj of genres) {
      if (gID == genreObj.id) {
        genresAsString.push(genreObj.name);
      }
    }
  });
  return genresAsString.join(', ');
};

const generateMovieRating = (rating) => {
  let numOfStars = Math.round(rating / 2);
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (numOfStars > 0) {
      html += `<svg class="solidStar" width="15px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>`;
      numOfStars--;
    } else {
      html += `<svg class="hollowStar" width="15px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>`;
    }
  }

  return html;
};
document.getElementById('searchIcon').addEventListener('click', setMoveData);
document.getElementById('searchBar').addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    setMoveData();
  }
});
// setMoveData();
console.log(moneyFormat(1458000.56));
