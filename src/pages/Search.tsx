
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "lesbian";
  const [page, setPage] = useState(1);

  const fetchMovies = async ({ queryKey }: { queryKey: [string, string, number] }) => {
    const [_, searchQuery, pageNum] = queryKey;
    const apiKey = "YOUR_TMDB_API_KEY"; // This should be replaced with a proper API key
    
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${pageNum}&include_adult=true`
    );
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    return response.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", query, page],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch search results. Please try again later.");
    }
  }, [isError]);

  return (
    <main className="min-h-screen bg-background text-foreground pt-20">
      <Navbar />
      
      <div className="content-container py-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground mb-8">Showing results for "{query}"</p>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-muted rounded-md animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-lg text-foreground/70">Failed to load search results</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {data?.results?.map((movie: Movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <Card className="overflow-hidden movie-card">
                    <div className="aspect-[2/3] relative">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <p className="text-muted-foreground text-center p-4">{movie.title}</p>
                        </div>
                      )}
                      <div className="movie-card-overlay">
                        <h3 className="font-medium text-white">{movie.title}</h3>
                        <div className="flex items-center text-xs text-white/80 mt-1">
                          <span>{movie.release_date?.split('-')[0] || 'Unknown'}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {data?.total_pages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={page === data.total_pages}
                  onClick={() => setPage((p) => Math.min(data.total_pages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </main>
  );
};

export default Search;
