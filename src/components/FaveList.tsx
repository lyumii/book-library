import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Book {
  title: string;
  authors: {
    name: string;
  }[];
}

export default function FaveList() {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const navigate = useNavigate();

  const goToFaveBooks = () => {
    navigate("/favebooks");
  };

  useEffect(() => {
    const storedFaves: Book[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFaves);
  }, []);

  return (
    <div className="flex flex-col gap-3 justify-between h-full">
      <h3 className="text-2xl font-bold text-center underline my-5 ">
        Current Faves List:
      </h3>
      <ul className="list-disc px-5 italic  flex flex-col gap-3 flex-grow">
        {favorites.map((book, index) => (
          <li key={index}>
            {book.title} by{" "}
            {book.authors.map((author) => author.name).join(", ")}
          </li>
        ))}
      </ul>
      <button onClick={goToFaveBooks} className="w-full bg-[#B5A38A] shadow-lg">
        Manage your faves
      </button>
    </div>
  );
}
