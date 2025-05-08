import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Play, Heart, Bookmark } from 'lucide-react';
import CategoryRow from '@/components/CategoryRow';
import { getMovieDetails, getLatestMovies } from '@/services/tmdb';
import { Movie } from '@/types/movie';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showContent, setShowContent] = useState(false);
  
  const { data: movie, isLoading: isLoadingMovie } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });

  const { data: latestMovies } = useQuery({
    queryKey: ['latestMovies'],
    queryFn: () => getLatestMovies(),
  });
  
  // Get recommended movies (similar genre)
  const recommendedMovies = movie && latestMovies
    ? latestMovies.results
        .filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
        .slice(0, 5)
    : [];
  
  useEffect(() => {
    setShowContent(true);
    // Scroll to top when movie changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (isLoadingMovie || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="w-32 h-32 bg-muted rounded-full animate-pulse mx-auto mb-4" />
          <div className="h-8 w-48 bg-muted rounded animate-pulse mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar transparent />
      
      {/* Hero banner */}
      <div className="relative w-full h-[70vh]">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0">
          <img 
            src={movie.backdropUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
      </div>
      
      {/* Movie details */}
      <div className={`content-container relative -mt-48 ${showContent ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <img 
              src={movie.posterUrl} 
              alt={movie.title}
              className="w-full rounded-lg shadow-xl" 
            />
          </div>
          
          {/* Movie info */}
          <div className="flex-grow">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center text-sm text-foreground/80 mb-4">
              <span className="mr-2 text-sapphic-pink font-medium">
                {movie.rating.toFixed(1)}/5
              </span>
              <span>{movie.year}</span>
              <span className="mx-2">•</span>
              <span>{movie.duration}</span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Synopsis</h2>
              <p className="text-foreground/80">{movie.description}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Director</h2>
                <p className="text-foreground/80">{movie.director}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-2">Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <Link 
                      key={genre} 
                      to={`/browse?category=${genre}`}
                      className="px-3 py-1 bg-muted text-sm rounded-full hover:bg-sapphic-pink hover:text-white transition-colors"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Cast</h2>
              <p className="text-foreground/80">{movie.cast.join(", ")}</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-sapphic-pink hover:bg-sapphic-pink/90 flex items-center gap-2">
                <Play className="h-4 w-4" />
                <span>Play</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Add to Favorites</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                <span>Add to Watchlist</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Movies */}
      <div className="content-container py-16">
        <CategoryRow title="You Might Also Like" movies={recommendedMovies} />
      </div>
      
      <Footer />
    </main>
  );
};

export default MovieDetails;
