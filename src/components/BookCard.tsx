export interface BookCardProps {
  id?: string;
  title: string;
  authors: {
    name: string;
  }[];
  summaries: string[];
  bookshelves: string[];
  addFavorite: (book: BookCardProps) => void;
  removeFavorite: (bookId: string) => void;
}

export default function BookCard(props: BookCardProps) {
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
    console.log(`btn clicked`);
  };
  return (
    <div>
      <h3>{props.title}</h3>
      <h4>{props.authors.map((author) => author.name).join(", ")}</h4>
      <p>
        {props.summaries.length > 0
          ? props.summaries[0]
          : "No summary available"}
      </p>
      <ul>
        {props.bookshelves.map((shelf, index) => (
          <li key={index}>{shelf}</li>
        ))}
      </ul>
      <button onClick={handleBtnClick}>fave me</button>
    </div>
  );
}
