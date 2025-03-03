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
      <div className="flex flex-col gap-3 mt-5">
        <form
          className="flex flex-col gap-2 align-center"
          onSubmit={handleSearch}
        >
          <input
            className="w-full border-1 border-[#B5A38A] shadow-lg"
            type="text"
            placeholder="EXPLORE OUR LIBRARY"
            onChange={handleInput}
          />
          <button className="w-full bg-[#B5A38A] shadow-lg" type="submit">
            Search
          </button>
        </form>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <section className="bookcards grid grid-cols-2 gap-3">
          {books.map((book, index) => (
            <BookCard
              key={book.id + book.title}
              className={index % 3 === 0 ? "col-span-2" : "col-span-1"}
              title={book.title}
              authors={book.authors}
              summaries={book.summaries}
              bookshelves={book.bookshelves}
              addFavorite={props.addFavorite}
              removeFavorite={props.removeFavorite}
            />
          ))}
        </section>
      )}
    </div>
  );
}
