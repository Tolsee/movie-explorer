const API_BASE = process.env.REACT_APP_API_BASE;
const API_KEY = process.env.REACT_APP_API_KEY;

async function get(url) {
  const response = await fetch(`${API_BASE}/${url}`);
  return response.json();
}

export async function search(searchText, page) {
  let url;
  if (searchText) {
    const searchParams = searchText.split(' ').join('+');
    url = `search/movie?api_key=${API_KEY}&query=${searchParams}&page=${page}`;
  } else {
    url = `discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
  }

  return await get(url);
}

export async function getMovie(id) {
  const movie = await get(`movie/${id}?append_to_response=videos&api_key=${API_KEY}`);
  if (movie.status_code === 34) {
    return undefined;
  }
  return movie;
}

export async function getSimilarMovies(id) {
  return await get(`movie/${id}/similar?api_key=${API_KEY}`);
}

export async function getTrailerVideo(id) {
  const { results = [] } = await get(`movie/${id}/videos?api_key=${API_KEY}`);
  const video = results.find(video => video.type === 'Trailer');
  return video;
}
