import { useContext, useEffect, useRef, useState } from "react";
import { UserData } from "../contexts/GlobalContext";

const SearchBar = () => {
  const baseUrl = process.env.VITE_API_URL;
  const apiKey = process.env.VITE_API_KEY;
  const nameRef = useRef();
  const { setAnimalsList, setIsLoading, setHasError } = useContext(UserData);
  const [prevAnimalName, setPrevAnimalName] = useState(null);

  const getAnimal = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const currentAnimalName = nameRef.current.value;

      if (currentAnimalName.trim() === "") {
        // Handle the case where the name is empty
        console.error("Invalid name value");
        setHasError(true);
        setIsLoading(false);
        return;
      }

      // Prevent redundant data fetching when repeatedly clicking the search button with the same animal name
      if (currentAnimalName !== prevAnimalName) {
        const res = await fetch(`${baseUrl}?name=${currentAnimalName}`, {
          method: "GET",
          headers: {
            "X-Api-Key": apiKey,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setAnimalsList(data);
        setPrevAnimalName(currentAnimalName);
      }

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // cleanup function to reset the previousName when the component unmounts
    return () => {
      setPrevAnimalName(null);
    };
  }, []);

  return (
    <div className="flex flex-row justify-center items-center w-screen gap-x-2 mb-6">
      <input
        type="text"
        ref={nameRef}
        placeholder="Put your fave animal name!"
        className="block w-80 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button
        className="block w-80 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={getAnimal}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
