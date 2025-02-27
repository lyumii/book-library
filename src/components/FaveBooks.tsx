import { useState, useEffect } from "react";
import BookCard, { BookCardProps } from "./BookCard";

interface faveBookProps {
  removeFavorites: (bookId: string) => void;
}

export default function FaveBooks(props: faveBookProps) {
  const [favorites, setFavorites] = useState<BookCardProps[]>([]);

  useEffect(() => {
    const storedFaves = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFaves);
  }, []);

  const clear = () => {
    localStorage.clear();
  };

  const handleRemove = (bookId: string) => {
    props.removeFavorites(bookId);
    setFavorites((prevFavs) => prevFavs.filter((book) => bookId !== book.id));
  };

  return (
    <div>
      <h2>My favorite books</h2>
      {favorites.length > 0 ? (
        favorites.map((book) => (
          <BookCard
            key={book.id + book.title}
            id={book.id}
            title={book.title}
            authors={book.authors}
            summaries={book.summaries}
            bookshelves={book.bookshelves}
            addFavorite={() => {}}
            removeFavorite={handleRemove}
          />
        ))
      ) : (
        <p>No fave books saved yet</p>
      )}
      <button onClick={clear}>Clear all</button>
      <button onClick={() => console.log(favorites)}>console log me</button>
    </div>
  );
}
