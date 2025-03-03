import { useState } from "react";

export interface BookCardProps {
  id?: string;
  title: string;
  authors: {
    name: string;
  }[];
  summaries: string[];
  bookshelves: string[];
  className: string;
  addFavorite: (book: BookCardProps) => void;
  removeFavorite: (bookId: string) => void;
}

export default function BookCard(props: BookCardProps) {
  const [addOrRemove, setAddOrRemove] = useState(false);

  const handleBtnClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFavored = favorites.some(
      (book: BookCardProps) => book.id === props.id
    );
    if (isFavored) {
      if (props.id) {
        props.removeFavorite(props.id);
      }
    } else {
      props.addFavorite(props);
    }
    setAddOrRemove((prev) => !prev);
  };

  return (
    <div
      className={`bg-[#faf3e0] flex flex-col justify-between mt-5 pb-5 overflow-hidden shadow-xl rounded-lg ${props.className}`}
    >
      {" "}
      <div className="text-justify p-5">
        <div className="border-b-2 border-b-[#706F6F] h-24">
          <h3 className=" sm:text-lg lg:text-2xl font-bold w-full">
            {props.title}
          </h3>
          <h4 className="sm:text-md lg:text-lg">
            {props.authors.map((author) => author.name).join(", ")}
          </h4>
        </div>
        <div className="mt-5">
          <img
            className="border-2 float-left mr-4 mb-2 w-50 h-auto object-cover"
            src="https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="picture of books"
          />
          <p className="text-justify lg:text-sm/7 sm:text-xs/6">
            {props.summaries.length > 0
              ? props.summaries[0]
              : "No summary available"}
          </p>
        </div>
      </div>
      <div>
        <ul className="flex gap-3 text-sm font-semibold pl-5 flex-wrap">
          {props.bookshelves.map((shelf, index) => (
            <li
              key={index}
              className={
                index === props.bookshelves.length - 1 ? "" : "border-r-2 pr-2"
              }
            >
              {shelf}
            </li>
          ))}
        </ul>
        <button
          className="w-full shadow-lg pl-5 mt-5 text-left bg-[#B5A38A] font-semibold"
          onClick={handleBtnClick}
        >
          {addOrRemove ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}
