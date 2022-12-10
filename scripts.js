const getMoveData = async () => {
  const req = await fetch(
    'https://api.themoviedb.org/3/search/movie?api_key=94501fa08c614734eea69931d25cb54a&language=en-US&query=iron%20man&page=1&include_adult=true'
  );
  const data = await req.json();
  console.log(data);
};

getMoveData();
