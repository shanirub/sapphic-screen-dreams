import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import FeaturedMovie from '@/components/FeaturedMovie';
import CategoryRow from '@/components/CategoryRow';
import Footer from '@/components/Footer';
import { getLatestMovies } from '@/services/tmdb';
import { Movie } from '@/types/movie';

const Index = () => {
  const [showContent, setShowContent] = useState(false);
  
  const { data: latestMovies, isLoading } = useQuery({
    queryKey: ['latestMovies'],
    queryFn: () => getLatestMovies(),
  });

  useEffect(() => {
    setShowContent(true);
  }, []);

  if (isLoading || !latestMovies) {
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

  // Get featured movie (first movie from latest)
  const featuredMovie = latestMovies.results[0];
  
  // Get trending movies (movies with rating > 4)
  const trendingMovies = latestMovies.results.filter(movie => movie.rating > 4);
  
  // Get new releases (all latest movies)
  const newReleases = latestMovies.results;
  
  // Get classics (movies older than 5 years)
  const classics = latestMovies.results.filter(movie => new Date().getFullYear() - movie.year > 5);

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
        <CategoryRow title="You Might Like" movies={latestMovies.results.slice(0, 5)} />
      </div>
      
      <Footer />
    </main>
  );
};

export default Index;
