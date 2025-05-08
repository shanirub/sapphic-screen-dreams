import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import FeaturedMovie from '@/components/FeaturedMovie';
import CategoryRow from '@/components/CategoryRow';
import Footer from '@/components/Footer';
import { getLibraryMovies } from '@/services/tmdb';
import { Movie } from '@/types/movie';

const Index = () => {
  const [showContent, setShowContent] = useState(false);
  
  const { data: libraryMovies, isLoading } = useQuery({
    queryKey: ['libraryMovies'],
    queryFn: () => getLibraryMovies(),
  });

  useEffect(() => {
    setShowContent(true);
  }, []);

  if (isLoading || !libraryMovies) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar transparent />
        <div className="content-container py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-muted rounded-md animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Get featured movie (first movie from results)
  const featuredMovie = libraryMovies.results[0];
  
  // Get trending movies (next 5 movies)
  const trendingMovies = libraryMovies.results.slice(1, 6);
  
  // Get new releases (next 5 movies)
  const newReleases = libraryMovies.results.slice(6, 11);
  
  // Get classics (next 5 movies)
  const classics = libraryMovies.results.slice(11, 16);
  
  // Get recommended movies (next 5 movies)
  const recommendedMovies = libraryMovies.results.slice(16, 21);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar transparent />
      
      {/* Hero Section */}
      <FeaturedMovie movie={featuredMovie} />
      
      {/* Content Section */}
      <div className={`content-container py-12 space-y-12 ${showContent ? 'animate-fade-in' : 'opacity-0'}`}>
        <CategoryRow title="Trending Now" movies={trendingMovies} />
        <CategoryRow title="New Releases" movies={newReleases} />
        <CategoryRow title="Sapphic Classics" movies={classics} />
        <CategoryRow title="You Might Like" movies={recommendedMovies} />
      </div>
      
      <Footer />
    </main>
  );
};

export default Index;
