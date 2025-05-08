
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FeaturedMovie from '@/components/FeaturedMovie';
import CategoryRow from '@/components/CategoryRow';
import Footer from '@/components/Footer';
import { movies } from '@/data/movieData';

const Index = () => {
  // Get featured movie
  const featuredMovie = movies.find(movie => movie.featured) || movies[0];
  
  // Get trending movies
  const trendingMovies = movies.filter(movie => movie.trending);
  
  // Get new releases
  const newReleases = movies.filter(movie => movie.newRelease);
  
  // Get classics
  const classics = movies.filter(movie => movie.classic);

  // Animation state
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    setShowContent(true);
  }, []);

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
        <CategoryRow title="You Might Like" movies={movies.slice(0, 5)} />
      </div>
      
      <Footer />
    </main>
  );
};

export default Index;
