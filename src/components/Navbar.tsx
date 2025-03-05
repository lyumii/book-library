import { Link } from "react-router-dom";

export default function Navbar() {
  const today = new Date();
  const week = today.getDay();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  let dayName;
  switch (week) {
    case 0:
      dayName = "Sunday";
      break;
    case 1:
      dayName = "Monday";
      break;
    case 2:
      dayName = "Tuesday";
      break;
    case 3:
      dayName = "Wednesday";
      break;
    case 4:
      dayName = "Thursday";
      break;
    case 5:
      dayName = "Friday";
      break;
    case 6:
      dayName = "Saturday";
      break;
    default:
      dayName = "";
      break;
  }

  const formatToday = `${dayName}, ${day}.${month}.${year}`;

  return (
    <div className="navdiv lg:h-40 sm:h-auto flex flex-col justify-around gap-5 bg-[#faf3e0] dark:bg-stone-800 rounded-lg shadow-lg">
      <div className="flex flex-col gap-0">
        <h1 className="sm:text-2xl lg:text-5xl font-semibold text-[#2E2E2E] dark:text-orange-300 uppercase tracking-wide">
          the gutendex times
        </h1>
        <h2 className="text-[#706F6F] dark:text-orange-200 sm:text-lg lg:text-xl">
          Bringing Classic Literature to the Digital Age
        </h2>
      </div>
      <nav className="flex justify-between border-t-4 border-b-4 border-t-[#706F6F] dark:border-t-orange-300 border-b-[#706F6F] dark:border-b-orange-300">
        <div className="flex gap-5">
          <Link to="/">
            <span className="text-[#2E2E2E] dark:text-orange-200 uppercase lg:text-xl sm:text-xs font-bold">
              Home
            </span>{" "}
          </Link>
          <Link to="/search/all">
            <span className="text-[#2E2E2E] dark:text-orange-200 uppercase lg:text-xl sm:text-xs font-bold">
              Search
            </span>
          </Link>
          <Link to="/categories">
            <span className="text-[#2E2E2E] dark:text-orange-200 uppercase lg:text-xl sm:text-sm font-bold">
              Categories
            </span>
          </Link>
          <Link to="/favebooks">
            <span className="text-[#2E2E2E] dark:text-orange-200 uppercase lg:text-xl sm:text-sm font-semibold">
              Favorite Books
            </span>
          </Link>
        </div>
        <p className="text-[#2E2E2E] lowercase lg:text-lg sm:text-xs font-bold dark:text-orange-100">
          {formatToday}
        </p>
      </nav>
    </div>
  );
}
