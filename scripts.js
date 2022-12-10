let genres = [];
let moviesList = [];

const setMoveData = async () => {
  // Get Genres
  const req = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=94501fa08c614734eea69931d25cb54a&language=en-US'
  );
  const data = await req.json();
  genres = data.genres;

  // Get Movies
  const moviesReq = await fetch(
    'https://api.themoviedb.org/3/search/movie?api_key=94501fa08c614734eea69931d25cb54a&language=en-US&query=avengers&page=1&include_adult=false'
  );
  const moviesData = await moviesReq.json();
  moviesList = moviesData.results;
  console.log(moviesList);

  setInfo();
};

const setInfo = () => {
  moviesList.forEach((movie) => {
    document.getElementById('thing').innerHTML += `
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
      html += `<img width="15px" src="images/star-solid.svg"/>`;
      numOfStars--;
    } else {
      html += `<img width="15px" src="images/star-regular.svg"/>`;
    }
  }

  return html;
};

setMoveData();
