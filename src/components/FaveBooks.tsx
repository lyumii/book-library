import BookCard, { BookCardProps } from "./BookCard";

export default function FaveBooks() {
  const favorites: BookCardProps[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  const clear = () => {
    localStorage.clear();
    console.log(`cleared`);
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
            removeFavorite={() => {}}
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
