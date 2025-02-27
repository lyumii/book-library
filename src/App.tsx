import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FaveBooks from "./components/FaveBooks";
import Navbar from "./components/Navbar";
import CategoryMenu from "./components/CategoryMenu";
import { BookCardProps } from "./components/BookCard";

function App() {
  // const addFavorite = (book: BookCardProps) => {
  //   const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  //   console.log(`before`, favorites);
  //   console.log(`book to add`, book);
  //   const isAlreadyFavored = favorites.some(
  //     (fav: BookCardProps) => fav.id === book.id
  //   );
  //   if (isAlreadyFavored) {
  //     favorites.push(book);
  //     localStorage.setItem("favorites", JSON.stringify(favorites));
  //   }
  //   console.log(
  //     "After adding:",
  //     JSON.parse(localStorage.getItem("favorites") || "[]")
  //   );
  // };

  const addFavorite = (book: BookCardProps) => {
    if (!book.id) {
      book = { ...book, id: crypto.randomUUID() }; // Generate a unique ID
      console.warn("Generated ID:", book.id);
    }

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites.push(book);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const removeFavorites = (bookId: string) => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    console.log("🔍 Current favorites before removal:", favorites); // Add this line
    favorites = favorites.filter((book: BookCardProps) => book.id !== bookId);
    console.log("🔍 Favorites after removal:", favorites); // Add this line
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
          <Route path="/favebooks" element={<FaveBooks />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
