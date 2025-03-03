import { fetchBooksSearch } from "./api";
import { useState, useEffect } from "react";
import BookCard, { BookCardProps } from "./BookCard";

interface HomeProps {
  addFavorite: (book: BookCardProps) => void;
  removeFavorite: (bookId: string) => void;
  handleBtn: (book: BookCardProps) => void;
}

export default function Home(props: HomeProps) {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<BookCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [faveUpdates, setFaveUpdates] = useState(false);

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

  const addOrRemoveFaves = (book: BookCardProps) => {
    props.handleBtn(book);
    setFaveUpdates((prev) => !prev);
  };

  useEffect(() => {
    setBooks([...books]);
  }, [faveUpdates]);

  return (
    <div>
      <div className="flex flex-col gap-3 mt-5">
        <form
          className="flex flex-col gap-2 align-center"
          onSubmit={handleSearch}
        >
          <input
            className="w-full border-1 border-[#B5A38A] shadow-lg dark:placeholder-orange-200"
            type="text"
            placeholder="..EXPLORE OUR LIBRARY"
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
            <div>
              <BookCard
                key={book.id || `fallback-${index}-${book.title}`}
                id={book.id || `fallback-${index}-${book.title}`}
                className={index % 3 === 0 ? "col-span-2" : "col-span-1"}
                title={book.title}
                authors={book.authors}
                summaries={book.summaries}
                bookshelves={book.bookshelves}
                addFavorite={props.addFavorite}
                removeFavorite={props.removeFavorite}
              />
              <button
                className="w-full shadow-lg pl-5 mt-5 text-left bg-[#B5A38A] font-semibold"
                onClick={() => addOrRemoveFaves(book)}
              >
                {JSON.parse(localStorage.getItem("favorites") || "[]").some(
                  (fav: BookCardProps) => fav.id === book.id
                )
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
