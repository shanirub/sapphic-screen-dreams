
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

export const movies: Movie[] = [
  {
    id: "1",
    title: "Portrait of a Lady on Fire",
    year: 2019,
    description: "On an isolated island in Brittany at the end of the eighteenth century, a female painter is obliged to paint a wedding portrait of a young woman.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNjgwNjkwOWYtYmM3My00NzI1LTk5OGItYWY0OTMyZTY4OTg3XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BYjZlYzVlNjgtOGIwMC00YzQ4LWIzMDItODRlNWEwZTFiNDg0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    duration: "2h 2m",
    genres: ["Drama", "Romance", "Historical"],
    director: "Céline Sciamma",
    cast: ["Noémie Merlant", "Adèle Haenel", "Luàna Bajrami"],
    rating: 4.8,
    featured: true
  },
  {
    id: "2",
    title: "Carol",
    year: 2015,
    description: "An aspiring photographer develops an intimate relationship with an older woman in 1950s New York.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTczNTQ4OTEyNV5BMl5BanBnXkFtZTgwNDgyMDI3NjE@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BMTQ5ODQwNDU3NV5BMl5BanBnXkFtZTgwMTM5NzM0NzE@._V1_.jpg",
    duration: "1h 58m",
    genres: ["Drama", "Romance"],
    director: "Todd Haynes",
    cast: ["Cate Blanchett", "Rooney Mara", "Sarah Paulson"],
    rating: 4.7,
    trending: true
  },
  {
    id: "3",
    title: "The Handmaiden",
    year: 2016,
    description: "A woman is hired as a handmaiden to a Japanese heiress, but secretly she is involved in a plot to defraud her.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDJhYTk2MTctZmVmOS00OTViLTgxNjQtMzQxOTRiMDdmNGRjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BYzVlYmJjYWYtYzY5MC00MmYyLWJjMTEtMjMzZGMzMGU5MDZiXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
    duration: "2h 24m",
    genres: ["Drama", "Romance", "Thriller"],
    director: "Park Chan-wook",
    cast: ["Kim Min-hee", "Kim Tae-ri", "Ha Jung-woo"],
    rating: 4.6,
    newRelease: true
  },
  {
    id: "4",
    title: "Desert Hearts",
    year: 1985,
    description: "A woman on the precipice of divorce in 1950s Nevada finds herself drawn to a female ranch hand who stirs up unexpected feelings.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMmJjYTY5NzItMGIxMy00OTA3LWE5NjUtMDc0ZTNlN2JmOTQzXkEyXkFqcGdeQXVyMzk0NDMzMjQ@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BMTYzMzgwMTk2Ml5BMl5BanBnXkFtZTgwMDA3MzE5MTE@._V1_.jpg",
    duration: "1h 36m",
    genres: ["Drama", "Romance", "Western"],
    director: "Donna Deitch",
    cast: ["Helen Shaver", "Patricia Charbonneau", "Audra Lindley"],
    rating: 4.5,
    classic: true
  },
  {
    id: "5",
    title: "Rafiki",
    year: 2018,
    description: "Kena and Ziki live very different lives in Nairobi. Their paths cross when they both decide to run in the local election, and they find themselves drawn to each other.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTk3OTUyNTQxNF5BMl5BanBnXkFtZTgwNzIxNTk4NjM@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BMDRlMDcxNjAtOTQ0ZS00NjJiLWFiZmUtZGRkZTc4MTg3NzFjXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_.jpg",
    duration: "1h 22m",
    genres: ["Drama", "Romance"],
    director: "Wanuri Kahiu",
    cast: ["Samantha Mugatsia", "Sheila Munyiva", "Jimmi Gathu"],
    rating: 4.4,
    trending: true
  },
  {
    id: "6",
    title: "But I'm a Cheerleader",
    year: 1999,
    description: "A naive teenager is sent to a rehab camp when her parents suspect her of being gay.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZDJlNDdmOGItNGQzZC00ZTEzLThiNTctNDRlNGI1YWYxYmUzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BYzVkZTMwZDUtNjc4Yi00MWM5LWJlZjMtODJkNzQ1OTFkN2I0XkEyXkFqcGdeQXVyMjUxOTAxNzI@._V1_.jpg",
    duration: "1h 25m",
    genres: ["Comedy", "Drama", "Romance"],
    director: "Jamie Babbit",
    cast: ["Natasha Lyonne", "Clea DuVall", "Michelle Williams"],
    rating: 4.3,
    classic: true
  },
  {
    id: "7",
    title: "Disobedience",
    year: 2017,
    description: "A woman returns to her Orthodox Jewish community that shunned her for her attraction to a female childhood friend.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMzYxNDI5OTcwMV5BMl5BanBnXkFtZTgwODc4MzE3NDM@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BNjE3NWZlYmItNzZmMi00OTMyLWI3Y2MtZWY5ZTBlMTgwZjJhXkEyXkFqcGdeQXVyOTQzNjUwOTI@._V1_.jpg",
    duration: "1h 54m",
    genres: ["Drama", "Romance"],
    director: "Sebastián Lelio",
    cast: ["Rachel Weisz", "Rachel McAdams", "Alessandro Nivola"],
    rating: 4.2,
    newRelease: true
  },
  {
    id: "8",
    title: "Bound",
    year: 1996,
    description: "Corky, an ex-con, falls in love with Violet, the girlfriend of a violent gangster. They plot to steal millions of dollars from the gangster.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZmQxZGFkNzAtYTliMS00MTRjLWI0ZDktNDgxMDMzYzM0MDQ0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BMjE0ODk5MTk5Nl5BMl5BanBnXkFtZTcwMjUyNTgyMQ@@._V1_.jpg",
    duration: "1h 48m",
    genres: ["Crime", "Thriller", "Romance"],
    director: "Lana & Lilly Wachowski",
    cast: ["Jennifer Tilly", "Gina Gershon", "Joe Pantoliano"],
    rating: 4.1,
    classic: true
  }
];
