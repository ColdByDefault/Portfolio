/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { Book, Movie, Series, Game, Podcast } from "@/types/library";

export const booksData: Book[] = [
  {
    id: "book-1",
    type: "book",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    description:
      "A handbook of agile software craftsmanship that teaches you how to write code that is readable, maintainable, and efficient.",
    status: "completed",
    rating: 4.8,
    pages: 464,
    publishedYear: 2008,
    genre: ["Programming", "Software Engineering", "Technical"],
    isbn: "978-0132350884",
  },
  {
    id: "book-2",
    type: "book",
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    author: "David Thomas, Andrew Hunt",
    description:
      "Your journey to mastery. A guide to software engineering practices that help you become a better programmer.",
    status: "reading",
    rating: 4.9,
    pages: 352,
    publishedYear: 2019,
    genre: ["Programming", "Software Engineering", "Career Development"],
  },
  {
    id: "book-3",
    type: "book",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    description:
      "Most programming languages contain good parts and bad parts. JavaScript has more bad parts than good parts.",
    status: "planning",
    rating: 4.2,
    pages: 176,
    publishedYear: 2008,
    genre: ["JavaScript", "Web Development", "Programming"],
  },
  {
    id: "book-4",
    type: "book",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Gang of Four",
    description:
      "Describes 23 design patterns that help solve common software design problems.",
    status: "completed",
    rating: 4.6,
    pages: 395,
    publishedYear: 1994,
    genre: ["Programming", "Software Architecture", "Design Patterns"],
  },
  {
    id: "book-5",
    type: "book",
    title: "You Don't Know JS: Scope & Closures",
    author: "Kyle Simpson",
    description:
      "Deep dive into the core mechanics of JavaScript to truly understand the language.",
    status: "reading",
    rating: 4.7,
    pages: 98,
    publishedYear: 2014,
    genre: ["JavaScript", "Programming", "Web Development"],
  },
];

export const moviesData: Movie[] = [
  {
    id: "movie-1",
    type: "movie",
    title: "The Social Network",
    director: "David Fincher",
    description:
      "The story of Facebook's creation and the legal battles that followed.",
    status: "completed",
    rating: 4.7,
    releaseYear: 2010,
    duration: 120,
    genre: ["Drama", "Biography", "Tech"],
  },
  {
    id: "movie-2",
    type: "movie",
    title: "Steve Jobs",
    director: "Danny Boyle",
    description:
      "Three iconic product launches reveal how Steve Jobs navigated the music industry.",
    status: "completed",
    rating: 4.4,
    releaseYear: 2015,
    duration: 122,
    genre: ["Biography", "Drama", "Tech"],
  },
  {
    id: "movie-3",
    type: "movie",
    title: "Ex Machina",
    director: "Alex Garland",
    description:
      "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence.",
    status: "planned",
    rating: 4.6,
    releaseYear: 2014,
    duration: 108,
    genre: ["Sci-Fi", "Drama", "AI"],
  },
];

export const seriesData: Series[] = [
  {
    id: "series-1",
    type: "series",
    title: "Silicon Valley",
    creator: "Mike Judge",
    description:
      "Follows the misadventures of introverted computer programmer Richard and his brainy friends.",
    status: "completed",
    rating: 4.5,
    releaseYear: 2014,
    seasons: 6,
    episodes: 53,
    genre: ["Comedy", "Tech", "Satire"],
  },
  {
    id: "series-2",
    type: "series",
    title: "Mr. Robot",
    creator: "Sam Esmail",
    description:
      "Elliot, a young programmer, suffers from a debilitating anti-social disorder and decides to connect with people by hacking them.",
    status: "watching",
    rating: 4.8,
    releaseYear: 2015,
    seasons: 4,
    episodes: 45,
    genre: ["Drama", "Crime", "Hacking"],
  },
  {
    id: "series-3",
    type: "series",
    title: "Black Mirror",
    creator: "Charlie Brooker",
    description:
      "An anthology series exploring a twisted, high-tech world where humanity's greatest innovations clash with our darkest instincts.",
    status: "completed",
    rating: 4.7,
    releaseYear: 2011,
    seasons: 6,
    episodes: 27,
    genre: ["Sci-Fi", "Drama", "Technology"],
  },
];

export const gamesData: Game[] = [
  {
    id: "game-1",
    type: "game",
    title: "Portal 2",
    developer: "Valve Corporation",
    description:
      "A puzzle-platform game that challenges players with spatial reasoning and logic puzzles.",
    status: "completed",
    rating: 4.9,
    releaseYear: 2011,
    platform: ["PC", "PlayStation", "Xbox"],
    genre: ["Puzzle", "Sci-Fi", "Adventure"],
    metacriticScore: 95,
  },
  {
    id: "game-2",
    type: "game",
    title: "The Witness",
    developer: "Thekla, Inc.",
    description:
      "A puzzle game where you explore a mysterious island filled with hundreds of hand-drawn puzzles.",
    status: "reading",
    rating: 4.3,
    releaseYear: 2016,
    platform: ["PC", "PlayStation", "Xbox", "Mobile"],
    genre: ["Puzzle", "Adventure", "Indie"],
    metacriticScore: 87,
  },
  {
    id: "game-3",
    type: "game",
    title: "Papers, Please",
    developer: "Lucas Pope",
    description:
      "A dystopian document thriller where you play as an immigration inspector.",
    status: "completed",
    rating: 4.6,
    releaseYear: 2013,
    platform: ["PC", "PlayStation", "Mobile"],
    genre: ["Simulation", "Indie", "Strategy"],
    metacriticScore: 85,
  },
];

export const podcastsData: Podcast[] = [
  {
    id: "podcast-1",
    type: "podcast",
    title: "Syntax",
    host: "Wes Bos & Scott Tolinski",
    description:
      "A Tasty Treats Podcast for Web Developers covering web development topics.",
    status: "completed",
    rating: 4.8,
    episodes: 500,
    platform: "Spotify",
  },
  {
    id: "podcast-2",
    type: "podcast",
    title: "The Changelog",
    host: "Adam Stacoviak & Jerod Santo",
    description:
      "Conversations with the hackers, leaders, and innovators of the software world.",
    status: "reading",
    rating: 4.7,
    episodes: 450,
    platform: "Multiple",
  },
  {
    id: "podcast-3",
    type: "podcast",
    title: "Developer Tea",
    host: "Jonathan Cutrell",
    description:
      "Short episodes designed to fit inside your tea break and help you become a better developer.",
    status: "planning",
    rating: 4.5,
    episodes: 1000,
    platform: "Apple Podcasts",
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
