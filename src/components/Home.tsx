import { fetchBooksSearch } from "./api";
import React from "react";
import BookCard, { BookCardProps } from "./BookCard";

interface HomeProps {
  addFavorite: (book: BookCardProps) => void;
  removeFavorite: (bookId: string) => void;
}

export default function Home(props: HomeProps) {
  const [search, setSearch] = React.useState("");
  const [books, setBooks] = React.useState<BookCardProps[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async () => {
    event?.preventDefault();
    setLoading(true);
    const formattedSearch = search.replace(/\s+/g, "%20");
    const results = await fetchBooksSearch(formattedSearch);
    setBooks(results);
    setLoading(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  return (
    <div>
      <div>
        <h2>Explore our library:</h2>
        <form onSubmit={handleSearch}>
          <input type="text" onChange={handleInput} />
          <button type="submit">Search</button>
        </form>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        books.map((book) => (
          <BookCard
            key={book.id + book.title}
            title={book.title}
            authors={book.authors}
            summaries={book.summaries}
            bookshelves={book.bookshelves}
            addFavorite={props.addFavorite}
            removeFavorite={props.removeFavorite}
          />
        ))
      )}
    </div>
  );
}
