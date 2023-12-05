import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import AnimalsList from "./AnimalsList";

const SearchPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
        My Favorite Wild Life!
      </h1>
      <Link
        to={`/myfavorites`}
        className="mb-6 text-lg text-center font-normal uppercase text-gray-500 dark:text-gray-400"
      >
        See my favorite wild animals!
      </Link>
      <SearchBar />
      <AnimalsList />
    </div>
  );
};

export default SearchPage;
