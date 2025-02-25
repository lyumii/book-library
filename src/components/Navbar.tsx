import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/categories">Categories</Link>
      <Link to="/favebooks">Favorite Books</Link>
    </nav>
  );
}
