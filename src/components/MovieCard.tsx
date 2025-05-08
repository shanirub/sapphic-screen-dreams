import { Link } from 'react-router-dom';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="movie-card group"
    >
      <div className="aspect-[2/3] relative overflow-hidden rounded-md">
        <img 
          src={movie.posterUrl} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-medium text-white text-sm">{movie.title}</h3>
            <div className="flex items-center text-xs text-white/80 mt-1">
              <span>{movie.year}</span>
              <span className="mx-2">•</span>
              <span>{movie.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard; 