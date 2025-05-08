import { Movie } from "@/types/movie";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

console.log('TMDB API Key:', TMDB_API_KEY ? 'Present' : 'Missing');
console.log('Environment:', import.meta.env);

if (!TMDB_API_KEY) {
  throw new Error("TMDB API key is not configured");
}

export async function getLatestMovies(page = 1): Promise<{ results: Movie[]; total_pages: number }> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch latest movies");
  }

  const data = await response.json();
  return {
    results: data.results.map((movie: any) => ({
      id: movie.id.toString(),
      title: movie.title,
      year: new Date(movie.release_date).getFullYear(),
      description: movie.overview,
      posterUrl: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}` : "",
      backdropUrl: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}` : "",
      duration: `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`,
      genres: movie.genre_ids.map((id: number) => getGenreName(id)),
      director: "Unknown", // TMDB API doesn't provide director in the list endpoint
      cast: [], // TMDB API doesn't provide cast in the list endpoint
      rating: movie.vote_average / 2, // Convert from 10 to 5 star scale
      featured: false,
      trending: false,
      newRelease: true,
      classic: false
    })),
    total_pages: data.total_pages
  };
}

export async function getMovieDetails(id: string): Promise<Movie> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const movie = await response.json();
  
  return {
    id: movie.id.toString(),
    title: movie.title,
    year: new Date(movie.release_date).getFullYear(),
    description: movie.overview,
    posterUrl: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}` : "",
    backdropUrl: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}` : "",
    duration: `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`,
    genres: movie.genres.map((genre: any) => genre.name),
    director: movie.credits.crew.find((person: any) => person.job === "Director")?.name || "Unknown",
    cast: movie.credits.cast.slice(0, 5).map((person: any) => person.name),
    rating: movie.vote_average / 2, // Convert from 10 to 5 star scale
    featured: false,
    trending: false,
    newRelease: true,
    classic: false
  };
}

// Helper function to get genre name from ID
function getGenreName(id: number): string {
  const genres: { [key: number]: string } = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
  };
  return genres[id] || "Unknown";
} 