import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FaveBooks from "./components/FaveBooks";
import Navbar from "./components/Navbar";
import CategoryMenu from "./components/CategoryMenu";
import { BookCardProps } from "./components/BookCard";

function App() {
  const addFavorite = (book: BookCardProps) => {
    if (!book.id) {
      book = { ...book, id: crypto.randomUUID() };
    }

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites.push(book);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const removeFavorites = (bookId: string) => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites = favorites.filter((book: BookCardProps) => book.id !== bookId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                addFavorite={addFavorite}
                removeFavorite={removeFavorites}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <CategoryMenu
                addFavorite={addFavorite}
                removeFavorite={removeFavorites}
              />
            }
          />
          <Route
            path="/favebooks"
            element={<FaveBooks removeFavorites={removeFavorites} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
