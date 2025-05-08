import { Movie } from "@/types/movie";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

console.log('TMDB API Key:', TMDB_API_KEY ? 'Present' : 'Missing');
console.log('Environment:', import.meta.env);

if (!TMDB_API_KEY) {
  throw new Error("TMDB API key is not configured");
}

// Library titles from movie_library.txt
const LIBRARY_TITLES = [
  // TV Shows
  "A League of Their Own",
  "Betty",
  "Ellen",
  "Gentleman Jack",
  "Lip Service",
  "LOCKED UP",
  "Long Slow Exhale",
  "The L Word",
  "The Morning Show",
  "Tipping the Velvet",
  "Wentworth",
  "Work in Progress",
  // Movies
  "Ammonite",
  "Better Than Chocolate",
  "Blue Is the Warmest Color",
  "But I'm A Cheerleader",
  "Claire of the Moon",
  "Desert Hearts",
  "Disobedience",
  "Do I Love You",
  "Even Cowgirls Get The Blues",
  "Foxfire",
  "Gia",
  "Gillery's Little Secret",
  "Gray Matters",
  "Gypsy",
  "High Art",
  "I Can't Think Straight",
  "If These Walls Could Talk 2",
  "Imagine Me and You",
  "Joe and Belle",
  "Kicking & Screaming",
  "Kiss Me Again",
  "Laughing Matters",
  "Losing Chase",
  "Love and Suicide",
  "Love on the Side",
  "Marion Bridge",
  "Me Without You",
  "Naissance des pieuvres",
  "Nina's Heavenly Delights",
  "Portrait of a Lady on Fire",
  "Saphros 1: Women In Love",
  "Stillwater",
  "Un Amour de Femme"
];

// Helper function to get random items from array
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
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

export async function getSapphicMovies(page = 1): Promise<{ results: Movie[]; total_pages: number }> {
  const response = await fetch(
    `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_keywords=6119&page=${page}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch sapphic movies");
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

export async function searchMovieByTitle(title: string): Promise<Movie | null> {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=en-US`
  );

  if (!response.ok) {
    throw new Error(`Failed to search for movie: ${title}`);
  }

  const data = await response.json();
  if (data.results.length === 0) {
    return null;
  }

  const movie = data.results[0];
  return {
    id: movie.id.toString(),
    title: movie.title,
    year: new Date(movie.release_date).getFullYear(),
    description: movie.overview,
    posterUrl: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}` : "",
    backdropUrl: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}` : "",
    duration: `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`,
    genres: movie.genre_ids.map((id: number) => getGenreName(id)),
    director: "Unknown",
    cast: [],
    rating: movie.vote_average / 2,
    featured: false,
    trending: false,
    newRelease: true,
    classic: false
  };
}

export async function searchTVShowByTitle(title: string): Promise<Movie | null> {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=en-US`
  );

  if (!response.ok) {
    throw new Error(`Failed to search for TV show: ${title}`);
  }

  const data = await response.json();
  if (data.results.length === 0) {
    return null;
  }

  const show = data.results[0];
  return {
    id: show.id.toString(),
    title: show.name,
    year: new Date(show.first_air_date).getFullYear(),
    description: show.overview,
    posterUrl: show.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${show.poster_path}` : "",
    backdropUrl: show.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/original${show.backdrop_path}` : "",
    duration: "TV Series",
    genres: show.genre_ids.map((id: number) => getGenreName(id)),
    director: "Unknown",
    cast: [],
    rating: show.vote_average / 2,
    featured: false,
    trending: false,
    newRelease: true,
    classic: false
  };
}

export async function getLibraryMovies(): Promise<{ results: Movie[]; total_pages: number }> {
  // Get random titles from library
  const randomTitles = getRandomItems(LIBRARY_TITLES, 21); // 1 featured + 5*4 sections

  // Search for each title
  const moviePromises = randomTitles.map(title => searchMovieByTitle(title));
  const results = await Promise.all(moviePromises);
  
  // Filter out null results
  const validMovies = results.filter((movie): movie is Movie => movie !== null);

  return {
    results: validMovies,
    total_pages: 1
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