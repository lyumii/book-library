import { useState, useEffect } from "react";
import BookCard, { BookCardProps } from "./BookCard";

interface faveBookProps {
  removeFavorites: (bookId: string) => void;
}

export default function FaveBooks(props: faveBookProps) {
  const [favorites, setFavorites] = useState<BookCardProps[]>([]);
  const [sortOrder, setSortOrder] = useState("default");

  const sortedBooks = [...favorites].sort((a, b) => {
    if (sortOrder === "default") return 0;
    if (sortOrder === "sort") return a.title.localeCompare(b.title);
    if (sortOrder === "reverse") return b.title.localeCompare(a.title);
    return 0;
  });

  useEffect(() => {
    const storedFaves = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFaves);
  }, []);

  const clear = () => {
    localStorage.clear();
    setFavorites([]);
  };

  const handleRemove = (bookId: string) => {
    if (!bookId) return;
    props.removeFavorites(bookId);
    setFavorites((prevFavs) => prevFavs.filter((book) => bookId !== book.id));
  };

  return (
    <div>
      <div className="flex  font-semibold gap-3 justify-end mt-5 dark:text-orange-100">
        <h2 className="">My favorite books:</h2>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Default</option>
          <option value="sort">Sort A-Z</option>
          <option value="reverse">Sort Z-A</option>
        </select>
      </div>

      {favorites.length > 0 ? (
        sortedBooks.map((book, index) => (
          <div>
            <BookCard
              key={book.id + book.title}
              className={index % 3 === 0 ? "col-span-2" : "col-span-1"}
              id={book.id}
              title={book.title}
              authors={book.authors}
              summaries={book.summaries}
              bookshelves={book.bookshelves}
              addFavorite={() => {}}
              removeFavorite={handleRemove}
            />
            <button
              className="w-full shadow-lg pl-5 mt-5 text-left bg-[#B5A38A] font-semibold"
              onClick={() => handleRemove(book.id)}
            >
              Remove from Favorites
            </button>
          </div>
        ))
      ) : (
        <p className="dark:text-orange-200">No fave books saved yet</p>
      )}
      <button className="w-full bg-[#B5A38A] shadow-lg" onClick={clear}>
        Clear all
      </button>
    </div>
  );
}
