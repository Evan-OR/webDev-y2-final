let genres = [];
let moviesList = [];

let modal = document.getElementById('modal');
modal.addEventListener('click', (e) => {
  if (e.target.id == 'modal') {
    modal.classList.add('modalHide');
  }
});

//Make API request, store information and create display elements
const setMoveData = async () => {
  let search = document.getElementById('searchBar').value;

  //If search bar has no valid value then just return
  if (search.replace(/\s/g, '') == '') return;

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

  if (moviesList.length === 0) {
    document.getElementById('display').innerHTML = '<div>Nothing Matches your search :(</div>';
    return;
  }

  createHTMLElements();
  addModalPopUp();
};

//Add events for search on button click and when user presses enter
document.getElementById('searchIcon').addEventListener('click', setMoveData);
document.getElementById('searchBar').addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    setMoveData();
  }
});

const createHTMLElements = () => {
  const displayElement = document.getElementById('display');
  displayElement.innerHTML = '';

  moviesList.forEach((movie) => {
    displayElement.innerHTML += `
    <div id="${movie.id}" class="movieDisplay">
      <img draggable="false" class="moviePoster" src="https://image.tmdb.org/t/p/w92/${movie.poster_path}"></img>

      <div class="movieInfoWrapper">
        <div class="movieTitle">${movie.title}</div>
        <div class="movieRatingWrapper">${generateMovieRating(movie.vote_average)}</div>
        <div class="movieGenres">${getGenres(movie.genre_ids)}</div>
      </div>
    </div>
  `;
  });
};

const addModalPopUp = () => {
  //CAN'T ADD EVENT LISTENERS IN createHTMLElements() function because elements are not accutally created yet. very cringe
  for (let i = 0; i < moviesList.length; i++) {
    document.getElementById(moviesList[i].id).addEventListener('click', () => {
      createModal(moviesList[i]);
      //Add close event listner
      document.getElementById('close').addEventListener('click', () => modal.classList.add('modalHide'));
      secondAPIRequestForModal(moviesList[i].id);
    });
  }
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

const createGenresHTML = (g) => {
  let html = '';
  g.forEach((genre) => {
    html += `<div class="genreIcon">${genre}</div>`;
  });

  return html;
};

const createModal = (movie) => {
  modal.classList.remove('modalHide');
  document.getElementById('infoInsert').innerHTML = `
  <div class="closeBtn">
    <svg id="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
  </div>
  <img draggable="false" class="moviePoster" src="https://image.tmdb.org/t/p/w185/${movie.poster_path}"></img>
  
  <div class="modalMovieInfoWrapper">
    <div class="modalMovieTitle">${movie.title}</div>
    <div class="movieGenres">
      ${createGenresHTML(getGenres(movie.genre_ids, true))}
    </div>
    <div id="rt" class="runtime"></div>

    <div class="modalMovieRatingWrapper">
      <svg class="ratingIcon" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
      </svg>
      <div class="ratingInfo">
        <div><b>${movie.vote_average}</b>/10</div>
        <div class="ratingVotes">${movie.vote_count} votes</div>
      </div>
    </div>

    <div class="modalMovieDesc">
    ${movie.overview}
    </div>

    <div class="otherInfoWrapper">
      <div class="releaseDateWrapper">
        <div><b>${movie.release_date.slice(0, 4)}</b></div>
        <div class="releaseDatetext">Released</div>
      </div>
      <div class="releaseDateWrapper">
        <div><b id="budget"></b></div>
        <div class="releaseDatetext">Budget</div>
      </div>
      <div class="releaseDateWrapper">
        <div><b id="boxOffice"></b></div>
        <div class="releaseDatetext">Box Office</div>
      </div>
      <div class="releaseDateWrapper">
        <div><b id="runtime"></b></div>
        <div class="releaseDatetext">Run Time</div>
      </div>
    </div>
    
  </div>
  `;
};

const secondAPIRequestForModal = async (movieID) => {
  const movieReq = await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=94501fa08c614734eea69931d25cb54a&language=en-US`
  );
  const movieData = await movieReq.json();

  document.getElementById('budget').innerText = formatMoney(movieData.budget);
  document.getElementById('boxOffice').innerText = formatMoney(movieData.revenue);
  document.getElementById('runtime').innerText = formatRuntime(movieData.runtime);
};
