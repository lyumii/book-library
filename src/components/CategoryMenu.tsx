import { useState, useEffect } from "react";
import BookCard, { BookCardProps } from "./BookCard";
import { fetchBooksCategory } from "./api";
import { useNavigate, useParams } from "react-router-dom";

interface CategoryProps {
  addFavorite?: (book: BookCardProps) => void;
  removeFavorite?: (bookId: string) => void;
  handleBtn?: (book: BookCardProps) => void;
  class?: string;
}

export default function CategoryMenu(props: CategoryProps) {
  const [categoryArray, setCategoryArray] = useState<BookCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [isOpen, setIsOpen] = useState(true);
  const [currentCategory, setCurrentCattegory] = useState("");
  const [faveUpdates, setFaveUpdates] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = async (
    event: React.MouseEvent<HTMLUListElement>
  ) => {
    const button = (event.target as HTMLElement).closest("button");
    if (button && button.textContent) {
      const selectedCategory = button.textContent;
      navigate(`/categories/${selectedCategory}`);
    }
  };

  const { categoryName } = useParams();

  useEffect(() => {
    if (categoryName) {
      setLoading(true);
      fetchBooksCategory(categoryName).then((fetchedBooks) => {
        setCategoryArray(fetchedBooks);
        setCurrentCattegory(categoryName);
        setLoading(false);
      });
    }
  }, [categoryName]);

  const sortedArray = [...categoryArray].sort(
    (a: BookCardProps, b: BookCardProps) => {
      if (sortOrder === "default") return 0;
      if (sortOrder === "sort") return a.title.localeCompare(b.title);
      if (sortOrder === "reverse") return b.title.localeCompare(a.title);
      return 0;
    }
  );

  const bookArray = sortedArray.map((book, index) => (
    <div>
      <BookCard
        key={book.id || `fallback-${index}-${book.title}`}
        id={book.id || `fallback-${index}-${book.title}`}
        className={index % 3 === 0 ? "col-span-2" : "col-span-1"}
        title={book.title}
        authors={book.authors}
        summaries={book.summaries}
        bookshelves={book.bookshelves}
        addFavorite={props.addFavorite ?? (() => {})}
        removeFavorite={props.removeFavorite ?? (() => {})}
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
  ));

  const buttons = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy",
  ];

  const addOrRemoveFaves = (book: BookCardProps) => {
    if (!props.handleBtn) return;
    props.handleBtn(book);
    setFaveUpdates((prev) => !prev);
  };

  useEffect(() => {
    setCategoryArray([...sortedArray]);
  }, [faveUpdates]);

  useEffect(() => {
    if (categoryArray.length > 0) {
      setIsOpen(false);
    }
  }, [categoryArray]);

  return (
    <section className={`categorymenu ${props.class} flex gap-3 mt-5 relative`}>
      {" "}
      <button
        className="absolute z-10 -top-4 -left-4 sm:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "✖" : "☰"}
      </button>
      <ul
        className={`fixed w-32 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        onClick={handleCategoryClick}
      >
        {buttons.map((item) => (
          <li className="bg-[#faf3e0] dark:bg-orange-200 mb-1.5 shadow-lg p-1 font-bold">
            <button>{item}</button>
          </li>
        ))}
      </ul>
      <div className="categorymaindiv ml-36">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div>
            <div
              className={`selectdiv ${props.class} hidden flex gap-3 absolute right-0 -top-4 font-semibold dark:text-orange-100`}
            >
              <h2>Current category: {currentCategory}</h2>
              <div className="flex">
                <legend>Sort by:</legend>
                <select onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="default">Default</option>
                  <option value="sort">A-Z</option>
                  <option value="reverse">Z-A</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5">{bookArray}</div>
          </div>
        )}
      </div>
    </section>
  );
}
