const API_BASE = process.env.REACT_APP_API_BASE;
const API_KEY = process.env.REACT_APP_API_KEY;

async function get(url) {
  const response = await fetch(url);
  return response.json();
}

export async function search(searchText, page) {
  let url;
  if (searchText) {
    const searchParams = searchText.split(' ').join('+');
    url = `${API_BASE}/search/movie?api_key=${API_KEY}&query=${searchParams}&page=${page}`;
  } else {
    url = `${API_BASE}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
  }

  return await get(url);
}

export async function getMovie(id) {
  return await get(`${API_BASE}/movie/${id}?append_to_response=videos&api_key=${API_KEY}`);
}

export async function getSimilarMovies(id) {
  return await get(`${API_BASE}/movie/${id}/similar?api_key=${API_KEY}`);
}
