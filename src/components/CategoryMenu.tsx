import { useState } from "react";
import BookCard, { BookCardProps } from "./BookCard";
import { fetchBooksCategory } from "./api";

export default function CategoryMenu() {
  const [categoryArray, setCategoryArray] = useState<BookCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = async (
    event: React.MouseEvent<HTMLUListElement>
  ) => {
    const button = (event.target as HTMLElement).closest("button");
    if (button && button.textContent) {
      setLoading(true);
      const fetchedBooks = await fetchBooksCategory(button.textContent);
      setCategoryArray(fetchedBooks);
      setLoading(false);
    }
  };
  return (
    <>
      {" "}
      <ul onClick={handleCategoryClick}>
        <li>
          <button>Fiction</button>
        </li>
        <li>
          <button>Mystery</button>
        </li>
        <li>
          <button>Thriller</button>
        </li>
        <li>
          <button>Romance</button>
        </li>
        <li>
          <button>Fantasy</button>
        </li>
        <li>
          <button>Morality</button>
        </li>
        <li>
          <button>Society</button>
        </li>
        <li>
          <button>Power</button>
        </li>
        <li>
          <button>Justice</button>
        </li>
        <li>
          <button>Adventure</button>
        </li>
        <li>
          <button>Tragedy</button>
        </li>
        <li>
          <button>War</button>
        </li>
        <li>
          <button>Philosophy</button>
        </li>
      </ul>
      <div>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          categoryArray.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              authors={book.authors}
              summaries={book.summaries}
              bookshelves={book.bookshelves}
            />
          ))
        )}
      </div>
    </>
  );
}
