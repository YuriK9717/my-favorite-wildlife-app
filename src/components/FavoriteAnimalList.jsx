import React, { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import AnimalsListTitle from "./AnimalListTitle";
import Rating from "./Rating";
import FavoriteAnimalListCharacteristics from "./FavoriteAnimalListCharacteristics";

const FavoriteAnimalList = ({ myFaves, isFaveAnimalList }) => {
  // toggle animal details
  const [expandedItem, setExpandedItem] = useState(null);

  const handleToggle = (animalName) => {
    setExpandedItem((prevItem) =>
      prevItem === animalName ? null : animalName
    );
  };

  const noAnimalList = (
    <div className="mt-6 text-lg text-center font-normal uppercase text-blue-700 dark:text-gray-400">
      Uh-oh! Your favorite animal hasn&apos;t joined the party yet
    </div>
  );

  return (
    <div className="w-9/12 h-3/6 mx-auto relative mb-3 overflow-scroll">
      {isFaveAnimalList
        ? Object.keys(myFaves).map((animal) => {
            const {
              isMyFave,
              userRating,
              likedCharacteristics,
              dislikedCharacteristics,
            } = myFaves[animal];

            return (
              isMyFave && (
                <React.Fragment key={animal}>
                  <AnimalsListTitle
                    expandedItem={expandedItem}
                    name={animal}
                    handleToggle={handleToggle}
                  />
                  {expandedItem === animal && (
                    <div className="p-4 text-sm text-slate-600 border-b border-solid border-slate-100">
                      <div className="flex flex-row items-center gap-[.2rem]">
                        <FontAwesomeIcon
                          className="text-[.4rem]"
                          icon={faCircle}
                        />{" "}
                        Your Rating for{" "}
                        <b className="text-blue-700">{animal}</b> :{" "}
                        <Rating initialRating={userRating} disabled={true} />
                      </div>
                      {likedCharacteristics &&
                        likedCharacteristics.length > 0 && (
                          <FavoriteAnimalListCharacteristics
                            animal={animal}
                            characteristics={likedCharacteristics}
                            preference={"like"}
                          />
                        )}
                      {dislikedCharacteristics &&
                        dislikedCharacteristics.length > 0 && (
                          <FavoriteAnimalListCharacteristics
                            animal={animal}
                            characteristics={dislikedCharacteristics}
                            preference={"not like"}
                          />
                        )}
                    </div>
                  )}
                </React.Fragment>
              )
            );
          })
        : noAnimalList}
    </div>
  );
};

// PropTypes validation
FavoriteAnimalList.propTypes = {
  myFaves: PropTypes.object.isRequired,
  isFaveAnimalList: PropTypes.bool.isRequired,
};
export default FavoriteAnimalList;
