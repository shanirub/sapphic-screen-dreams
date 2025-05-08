
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { movies, Movie } from '@/data/movieData';
import { Button } from '@/components/ui/button';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showContent, setShowContent] = useState(false);
  
  // Available genres from all movies
  const genres = Array.from(
    new Set(movies.flatMap((movie) => movie.genres))
  ).sort();

  useEffect(() => {
    // Filter based on URL parameter if provided
    if (category) {
      setActiveFilter(category);
      filterMovies(category);
    }
    
    setShowContent(true);
  }, [category]);

  const filterMovies = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredMovies(movies);
      return;
    }
    
    // Handle film/series filter (in a real app, you'd have a type field)
    if (filter === 'films' || filter === 'series') {
      // For demo, we'll just return all movies since we don't have separate types
      setFilteredMovies(movies);
      return;
    }
    
    // Filter by genre
    const filtered = movies.filter(movie => 
      movie.genres.includes(filter)
    );
    
    setFilteredMovies(filtered);
  };

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
      </div>
      
      <Footer />
    </main>
  );
};

export default Browse;
