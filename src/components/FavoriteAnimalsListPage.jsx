import { useContext, useEffect, useState } from "react";
import { UserData } from "../contexts/GlobalContext";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import useLocalStorage from "../hooks/useLocalStorage";
import FavoriteAnimalList from "./FavoriteAnimalList";


const FavoriteAnimalsListPage = () => {
  const { faveAnimalStates, setFaveAnimalStates } = useContext(UserData);

  // get stored fave animals
  const [storedFaves, , removeStoreFaves] = useLocalStorage("favorites");

  // set favorite animals list into local state
  const [myFaves, setMyFaves] = useState(faveAnimalStates);

  useEffect(() => {
    // handle the initial rendering with the stored fave animals value
    const isStoredFaves = storedFaves && Object.entries(storedFaves).length > 0;
    if (isStoredFaves) {
      setMyFaves(storedFaves);
      setFaveAnimalStates(storedFaves);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle reset animal list
  const handleReset = () => {
    removeStoreFaves("favorites");
    setMyFaves({});
    setFaveAnimalStates({});
  };

  // validate existing the animal list
  const isFaveAnimalList = Object.entries(myFaves).length > 0;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <h2 className="text-4xl font-bold dark:text-white">
        My Favorite wild animals!
      </h2>
      <small> *You can store maximum 20 animals. </small>
      <FavoriteAnimalList
        myFaves={myFaves}
        isFaveAnimalList={isFaveAnimalList}
      />
      <div className="button__container flex flex-row gap-6">
        {/* reset button */}
        {isFaveAnimalList && (
          <button
            className="py-2.5 px-5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleReset}
          >
            Reset my animal list
          </button>
        )}
        <Link
          to={`/`}
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          {" "}
          Back to the search page <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};

export default FavoriteAnimalsListPage;
