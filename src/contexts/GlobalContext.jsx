import { useState, createContext } from "react";
import PropTypes from "prop-types";

const UserData = createContext({});

const GlobalContextProvider = ({ children }) => {
  //handle fetch animal list
  const [animalsList, setAnimalsList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  //handle each fave animal states
  const [faveAnimalStates, setFaveAnimalStates] = useState({});

  const contextValue = {
    animalsList,
    setAnimalsList,
    isLoading,
    setIsLoading,
    hasError,
    setHasError,
    faveAnimalStates,
    setFaveAnimalStates,
  };

  return <UserData.Provider value={contextValue}>{children}</UserData.Provider>;
};

GlobalContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { UserData, GlobalContextProvider };
