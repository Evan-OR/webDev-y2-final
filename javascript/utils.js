const formatMoney = (money) => {
  money = money.toString();
  if (money.length > 9) {
    return money.substring(0, money.length - 9) + ' Bil';
  } else if (money.length > 6) {
    return money.substring(0, money.length - 6) + ' Mil';
  } else if (money.length > 3) {
    return money.substring(0, money.length - 3) + ' K';
  } else {
    return '??';
  }
};

const getGenres = (genreIDs, forModal) => {
  let genresAsString = [];

  genreIDs.forEach((gID) => {
    for (genreObj of genres) {
      if (gID == genreObj.id) {
        genresAsString.push(genreObj.name);
      }
    }
  });

  if (forModal) {
    return genresAsString;
  } else {
    return genresAsString.join(', ');
  }
};

const formatRuntime = (runtime) => {
  return `${Math.floor(runtime / 60)}hrs ${runtime % 60}mins`;
};
