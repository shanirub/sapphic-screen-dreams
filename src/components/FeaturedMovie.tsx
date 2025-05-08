
import { Link } from "react-router-dom";
import { Movie } from "@/data/movieData";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface FeaturedMovieProps {
  movie: Movie;
}

export default function FeaturedMovie({ movie }: FeaturedMovieProps) {
  return (
    <div className="relative w-full h-[70vh] animate-fade-in">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <img 
          src={movie.backdropUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative content-container flex flex-col justify-end h-full pb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-2xl mb-4">{movie.title}</h1>
        <div className="flex items-center text-sm text-white/80 mb-4">
          <span className="mr-2 text-sapphic-pink font-medium">
            {movie.rating.toFixed(1)}/5
          </span>
          <span>{movie.year}</span>
          <span className="mx-2">•</span>
          <span>{movie.duration}</span>
          <span className="mx-2">•</span>
          <span>{movie.genres.join(", ")}</span>
        </div>
        <p className="text-white/80 max-w-2xl mb-8">{movie.description}</p>
        <div className="flex space-x-4">
          <Button className="bg-sapphic-pink hover:bg-sapphic-pink/90 flex items-center gap-2">
            <Play className="h-4 w-4" />
            <span>Play Now</span>
          </Button>
          <Link to={`/movie/${movie.id}`}>
            <Button variant="outline">More Info</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
