import { fetchBooksSearch } from "./api";
import React from "react";
import BookCard, { BookCardProps } from "./BookCard";

export default function Home() {
  const [search, setSearch] = React.useState("");
  const [books, setBooks] = React.useState<BookCardProps[]>([]);

  const handleSearch = async () => {
    const formattedSearch = search.replace(/\s+/g, "%20");
    const results = await fetchBooksSearch(formattedSearch);
    setBooks(results);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  return (
    <div>
      <div>
        <h2>Explore our library:</h2>
        <input type="text" onChange={handleInput} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          authors={book.authors}
          summaries={book.summaries}
          bookshelves={book.bookshelves}
        />
      ))}
    </div>
  );
}
