import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { getLatestMovies } from '@/services/tmdb';
import { Movie } from '@/types/movie';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showContent, setShowContent] = useState(false);
  const [page, setPage] = useState(1);
  
  const { data: moviesData, isLoading } = useQuery({
    queryKey: ['latestMovies', page],
    queryFn: () => getLatestMovies(page),
  });

  // Get all unique genres from movies
  const genres = moviesData?.results
    ? Array.from(new Set(moviesData.results.flatMap(movie => movie.genres))).sort()
    : [];

  useEffect(() => {
    // Filter based on URL parameter if provided
    if (category) {
      setActiveFilter(category);
    }
    
    setShowContent(true);
  }, [category]);

  const filterMovies = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      return;
    }
    
    // Handle film/series filter (in a real app, you'd have a type field)
    if (filter === 'films' || filter === 'series') {
      // For demo, we'll just return all movies since we don't have separate types
      return;
    }
  };

  if (isLoading || !moviesData) {
    return (
      <main className="min-h-screen bg-background text-foreground pt-20">
        <Navbar />
        <div className="content-container py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-muted rounded-md animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  const filteredMovies = activeFilter === 'all'
    ? moviesData.results
    : moviesData.results.filter(movie => movie.genres.includes(activeFilter));

  return (
    <main className="min-h-screen bg-background text-foreground pt-20">
      <Navbar />
      
      <div className="content-container py-8">
        <h1 className="text-3xl font-bold mb-8">Browse</h1>
        
        {/* Filters */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            <Button 
              variant={activeFilter === 'all' ? "default" : "outline"} 
              onClick={() => filterMovies('all')}
              className={activeFilter === 'all' ? "bg-sapphic-pink hover:bg-sapphic-pink/90" : ""}
            >
              All
            </Button>
            
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={activeFilter === genre ? "default" : "outline"}
                onClick={() => filterMovies(genre)}
                className={activeFilter === genre ? "bg-sapphic-pink hover:bg-sapphic-pink/90" : ""}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Movie Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 ${showContent ? 'animate-fade-in' : 'opacity-0'}`}>
          {filteredMovies.map((movie) => (
            <a 
              href={`/movie/${movie.id}`} 
              key={movie.id}
              className="movie-card"
            >
              <div className="aspect-[2/3] relative">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-md" 
                />
                <div className="movie-card-overlay">
                  <h3 className="font-medium text-white">{movie.title}</h3>
                  <div className="flex items-center text-xs text-white/80 mt-1">
                    <span>{movie.year}</span>
                    <span className="mx-2">•</span>
                    <span>{movie.duration}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {filteredMovies.length === 0 && (
          <div className="text-center py-12 text-foreground/70">
            <p className="text-lg">No movies found matching your criteria</p>
            <Button 
              variant="link"
              onClick={() => filterMovies('all')}
              className="text-sapphic-pink"
            >
              View All Movies
            </Button>
          </div>
        )}

        {moviesData.total_pages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={page === moviesData.total_pages}
              onClick={() => setPage(p => Math.min(moviesData.total_pages, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
};

export default Browse;
