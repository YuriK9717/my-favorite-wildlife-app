import React, { useContext, useEffect, useState } from "react";

import { UserData } from "../contexts/GlobalContext";
import useLocalStorage from "../hooks/useLocalStorage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import AnimalsListTitle from "./AnimalListTitle";
import AnimalsListContent from "./AnimalListContent";

const AnimalsList = () => {
  const { animalsList, isLoading, hasError, faveAnimalStates } =
    useContext(UserData);

  // for setting up the localStorage
  const [, setLocalFaves] = useLocalStorage("favorites");
  console.log(animalsList);
  useEffect(() => {
    //handle update localStorage value
    const isFaveAnimalState = Object.entries(faveAnimalStates).length > 0;
    if (isFaveAnimalState) setLocalFaves(faveAnimalStates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faveAnimalStates]);

  //toggle animal details
  const [expandedItem, setExpandedItem] = useState(null);

  const handleToggle = (animalName) => {
    setExpandedItem((prevItem) =>
      prevItem === animalName ? null : animalName
    );
  };

  const isAnimalList = animalsList && Object.entries(animalsList).length > 0;

  // handle the error massage when there's empty string or there's a wrong name
  const errorMessage = hasError
    ? "Please enter a valid animal name!"
    : //here for hiding error message on the initial rendering
    animalsList
    ? "No matching animals found. Check the animal name again!"
    : null;

  if (isLoading) {
    return (
      <FontAwesomeIcon
        className="w-full h-16 mx-auto py-12"
        icon={faSpinner}
        spin
      />
    );
  }

  return isAnimalList ? (
    <div className="w-9/12 h-3/6 mx-auto relative mb-3 overflow-scroll">
      {animalsList.map((animal) => {
        const { name, characteristics } = animal;
        const faveAnimalState = faveAnimalStates[name] || {};
        const {
          isMyFave,
          userRating,
          likedCharacteristics,
          dislikedCharacteristics,
        } = faveAnimalState;
        return (
          <React.Fragment key={name}>
            <AnimalsListTitle
              expandedItem={expandedItem}
              name={name}
              handleToggle={handleToggle}
            />
            <AnimalsListContent
              name={name}
              expandedItem={expandedItem}
              isMyFave={isMyFave}
              userRating={userRating}
              characteristics={characteristics}
              likedCharacteristics={likedCharacteristics}
              dislikedCharacteristics={dislikedCharacteristics}
            />
          </React.Fragment>
        );
      })}
    </div>
  ) : (
    <div>{errorMessage}</div>
  );
};

export default AnimalsList;
