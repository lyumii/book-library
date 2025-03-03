import { useState, useEffect } from "react";
import BookCard, { BookCardProps } from "./BookCard";
import { fetchBooksCategory } from "./api";

interface CategoryProps {
  addFavorite: (book: BookCardProps) => void;
  removeFavorite: (bookId: string) => void;
}

export default function CategoryMenu(props: CategoryProps) {
  const [categoryArray, setCategoryArray] = useState<BookCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [isOpen, setIsOpen] = useState(true);
  const [currentCategory, setCurrentCattegory] = useState("");

  const handleCategoryClick = async (
    event: React.MouseEvent<HTMLUListElement>
  ) => {
    const button = (event.target as HTMLElement).closest("button");
    if (button && button.textContent) {
      setLoading(true);
      const fetchedBooks = await fetchBooksCategory(button.textContent);
      setCategoryArray(fetchedBooks);
      setCurrentCattegory(button.textContent);
      setLoading(false);
    }
  };

  const sortedArray = [...categoryArray].sort(
    (a: BookCardProps, b: BookCardProps) => {
      if (sortOrder === "default") return 0;
      if (sortOrder === "sort") return a.title.localeCompare(b.title);
      if (sortOrder === "reverse") return b.title.localeCompare(a.title);
      return 0;
    }
  );

  const bookArray = sortedArray.map((book, index) => (
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

  useEffect(() => {
    if (categoryArray.length > 0) {
      setIsOpen(false);
    }
  }, [categoryArray]);

  return (
    <section className="categorymenu flex gap-3 mt-5 relative">
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
          <li className="bg-[#faf3e0] mb-1.5 shadow-lg p-1 font-bold">
            <button>{item}</button>
          </li>
        ))}
      </ul>
      <div className="categorymaindiv ml-36">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div>
            <div className="selectdiv flex gap-3 absolute right-0 -top-4 font-semibold">
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
