
import { Link } from "react-router-dom";
import { Movie } from "@/data/movieData";

interface CategoryRowProps {
  title: string;
  movies: Movie[];
}

export default function CategoryRow({ title, movies }: CategoryRowProps) {
  return (
    <div className="mb-10">
      <h2 className="category-title">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="block movie-card">
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
          </Link>
        ))}
      </div>
    </div>
  );
}
