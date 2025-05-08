export interface Movie {
  id: string;
  title: string;
  year: number;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  duration: string;
  genres: string[];
  director: string;
  cast: string[];
  rating: number;
  featured?: boolean;
  trending?: boolean;
  newRelease?: boolean;
  classic?: boolean;
} 