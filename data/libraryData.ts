/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import type { Book, Movie, Series, Game, Podcast } from "@/types/library";

export const booksData: Book[] = [
  {
    id: "book-1",
    type: "book",
    title: "The Social Contract",
    author: "Jean-Jacques Rousseau",
    description:
      "A foundational political philosophy text exploring the concept of the social contract and collective sovereignty.",
    pages: 320,
    publishedYear: 1762,
    genre: ["Philosophy", "Politics", "Classic"],
    isbn: "9780140442014",
    goodreadsUrl:
      "https://www.goodreads.com/book/show/9702.The_Social_Contract",
    amazonUrl:
      "https://www.amazon.com/Social-Contract-Jean-Jacques-Rousseau/dp/0140442014",
  },
  {
    id: "book-2",
    type: "book",
    title: "Émile, or On Education",
    author: "Jean-Jacques Rousseau",
    description:
      "Rousseau’s influential treatise on education and child development, emphasizing natural human growth.",
    pages: 512,
    publishedYear: 1762,
    genre: ["Philosophy", "Education", "Classic"],
    isbn: "9780460873696",
    goodreadsUrl:
      "https://www.goodreads.com/book/show/142713.Emile_or_On_Education",
    amazonUrl:
      "https://www.amazon.com/Emile-Education-Jean-Jacques-Rousseau/dp/0460873692",
  },
  {
    id: "book-3",
    type: "book",
    title: "Thus Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    description:
      "Nietzsche’s philosophical novel introducing ideas such as the Übermensch and eternal recurrence.",
    pages: 352,
    publishedYear: 1883,
    genre: ["Philosophy", "Classic", "Literature"],
    isbn: "9780140441185",
    goodreadsUrl:
      "https://www.goodreads.com/book/show/51893.Thus_Spoke_Zarathustra",
    amazonUrl:
      "https://www.amazon.com/Thus-Spoke-Zarathustra-Nietzsche/dp/0140441182",
  },
  {
    id: "book-4",
    type: "book",
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    description:
      "Nietzsche’s exploration of morality, truth, and the philosophical traditions of the West.",
    pages: 240,
    publishedYear: 1886,
    genre: ["Philosophy", "Classic"],
    isbn: "9780140449235",
    goodreadsUrl:
      "https://www.goodreads.com/book/show/12321.Beyond_Good_and_Evil",
    amazonUrl:
      "https://www.amazon.com/Beyond-Good-Evil-Nietzsche/dp/014044923X",
  },
  {
    id: "book-5",
    type: "book",
    title: "The Muqaddimah",
    author: "Ibn Khaldun",
    description:
      "Ibn Khaldun’s groundbreaking introduction to history and sociology, examining the rise and fall of civilizations.",
    pages: 512,
    publishedYear: 1377,
    genre: ["History", "Sociology", "Philosophy"],
    isbn: "9780691120546",
    goodreadsUrl: "https://www.goodreads.com/book/show/144171.The_Muqaddimah",
    amazonUrl:
      "https://www.amazon.com/Muqaddimah-Introduction-History-Khaldun/dp/0691120549",
  },
  {
    id: "book-6",
    type: "book",
    title: "Ibn Khaldun: An Intellectual Biography",
    author: "Ibn Khaldun",
    description:
      "A reflective autobiographical and philosophical work by Ibn Khaldun, focusing on history, knowledge, and society.",
    pages: 400,
    publishedYear: 1406,
    genre: ["History", "Autobiography", "Philosophy"],
    isbn: "9780691166285",
    goodreadsUrl: "https://www.goodreads.com/book/show/25734066-ibn-khaldun",
    amazonUrl:
      "https://www.amazon.com/Ibn-Khaldun-Intellectual-Biography/dp/0691166283",
  },
];

export const moviesData: Movie[] = [
  {
    id: "movie-1",
    type: "movie",
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    description:
      "A nonlinear crime drama weaving together the stories of hitmen, a boxer, and others in Los Angeles’ underworld.",
    releaseYear: 1994,
    duration: 154,
    genre: ["Crime", "Drama", "Thriller"],
    imdbUrl: "https://www.imdb.com/title/tt0110912/",
  },
  {
    id: "movie-2",
    type: "movie",
    title: "Sweet November",
    director: "Pat O'Connor",
    description:
      "A romantic drama about a workaholic who meets a woman who changes his perspective on life and love.",
    releaseYear: 2001,
    duration: 119,
    genre: ["Romance", "Drama"],
    imdbUrl: "https://www.imdb.com/title/tt0230838/",
  },
  {
    id: "movie-3",
    type: "movie",
    title: "A Walk to Remember",
    director: "Adam Shankman",
    description:
      "A heartfelt romance about a high school bad boy who falls for the minister’s daughter.",
    releaseYear: 2002,
    duration: 101,
    genre: ["Romance", "Drama"],
    imdbUrl: "https://www.imdb.com/title/tt0281358/",
  },
];

export const seriesData: Series[] = [
  {
    id: "series-1",
    type: "series",
    title: "Game of Thrones",
    creator: "David Benioff, D.B. Weiss",
    description:
      "Epic fantasy series based on George R.R. Martin’s novels, depicting power struggles in Westeros.",
    releaseYear: 2011,
    seasons: 8,
    episodes: 73,
    genre: ["Fantasy", "Drama", "Adventure"],
  },
  {
    id: "series-2",
    type: "series",
    title: "Breaking Bad",
    creator: "Vince Gilligan",
    description:
      "A chemistry teacher turned meth kingpin struggles with morality, family, and crime.",
    releaseYear: 2008,
    seasons: 5,
    episodes: 62,
    genre: ["Crime", "Drama", "Thriller"],
  },
  {
    id: "series-3",
    type: "series",
    title: "Friends",
    creator: "David Crane, Marta Kauffman",
    description:
      "A beloved sitcom following six friends navigating life and relationships in New York City.",
    releaseYear: 1994,
    seasons: 10,
    episodes: 236,
    genre: ["Comedy", "Romance"],
  },
  {
    id: "series-4",
    type: "series",
    title: "Peaky Blinders",
    creator: "Steven Knight",
    description:
      "A crime drama about the Shelby crime family in post-WWI Birmingham, England.",
    releaseYear: 2013,
    seasons: 6,
    episodes: 36,
    genre: ["Crime", "Drama", "Historical"],
  },
  {
    id: "series-5",
    type: "series",
    title: "Mr. Robot",
    creator: "Sam Esmail",
    description:
      "A cyber-thriller following a hacker recruited to join an underground group trying to bring down corporations.",
    releaseYear: 2015,
    seasons: 4,
    episodes: 45,
    genre: ["Thriller", "Drama", "Crime"],
  },
];

export const gamesData: Game[] = [
  {
    id: "game-1",
    type: "game",
    title: "Elden Ring",
    developer: "FromSoftware",
    description:
      "An expansive action RPG set in a dark fantasy world, co-created by Hidetaka Miyazaki and George R.R. Martin.",
    releaseYear: 2022,
    platform: ["PC", "PlayStation", "Xbox"],
    genre: ["Action RPG", "Fantasy", "Open World"],
    metacriticScore: 96,
  },
  {
    id: "game-2",
    type: "game",
    title: "Red Dead Redemption 2",
    developer: "Rockstar Games",
    description:
      "An open-world Western adventure following Arthur Morgan and the Van der Linde gang in late 19th-century America.",
    releaseYear: 2018,
    platform: ["PC", "PlayStation", "Xbox"],
    genre: ["Action Adventure", "Open World", "Western"],
    metacriticScore: 97,
  },
];

export const podcastsData: Podcast[] = [
  {
    id: "podcast-1",
    type: "podcast",
    title: "",
    host: "",
    description: "",
    platform: "Spotify",
    spotifyUrl: "",
  },
];

// Combined data for easy access
export const allMediaData = {
  books: booksData,
  movies: moviesData,
  series: seriesData,
  games: gamesData,
  podcasts: podcastsData,
};

export default allMediaData;
