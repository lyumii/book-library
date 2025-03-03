import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FaveBooks from "./components/FaveBooks";
import Navbar from "./components/Navbar";
import CategoryMenu from "./components/CategoryMenu";
import { BookCardProps } from "./components/BookCard";
import Theme from "./components/Theme";
import ToggleSwitch from "./components/ToggleSwitch";

function App() {
  const addFavorite = (book: BookCardProps) => {
    if (!book.id) {
      book = { ...book, id: crypto.randomUUID() };
    }

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites.push(book);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const removeFavorite = (bookId: string) => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites = favorites.filter((book: BookCardProps) => book.id !== bookId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const handleBtnClick = (book: BookCardProps) => {
    if (!book.id) return;
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFavored = favorites.some(
      (favBook: BookCardProps) => favBook.id === book.id
    );

    if (isFavored) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  return (
    <Theme>
      <div className="p-5">
        <ToggleSwitch />
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                handleBtn={handleBtnClick}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <CategoryMenu
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                handleBtn={handleBtnClick}
              />
            }
          />
          <Route
            path="/favebooks"
            element={<FaveBooks removeFavorites={removeFavorite} />}
          />
        </Routes>
      </div>
    </Theme>
  );
}

export default App;
