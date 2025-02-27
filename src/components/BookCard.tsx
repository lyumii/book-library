export interface BookCardProps {
  id?: string;
  title: string;
  authors: {
    name: string;
  }[];
  summaries: string[];
  bookshelves: string[];
}

export default function BookCard(props: BookCardProps) {
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
    </div>
  );
}
