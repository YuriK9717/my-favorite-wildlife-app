import { useContext } from "react";
import { UserData } from "../contexts/GlobalContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartLight } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import Rating from "./Rating";

const AnimalListFaveAndRating = ({ name, isMyFave, userRating }) => {
  const { setFaveAnimalStates } = useContext(UserData);
  // handle adding the animal to fave list
  const handleToggleFave = (animalName) => {
    setFaveAnimalStates((prevStates) => ({
      ...prevStates,
      [animalName]: {
        ...prevStates[animalName],
        isMyFave: !prevStates[animalName]?.isMyFave || false,
      },
    }));
  };

  // handle the animal rating
  const handleRatingChange = (animalName, newRating) => {
    setFaveAnimalStates((prevStates) => ({
      ...prevStates,
      [animalName]: {
        ...prevStates[animalName],
        userRating: newRating,
      },
    }));
  };

  return (
    <div className="p-4">
      Do you like <b className="text-blue-700">{name}</b>? Add{" "}
      <b className="text-blue-700">{name}</b> to your list of favorite animals
      and Rate it!
      <button
        data-testid="fave-btn"
        className={`px-2 pb-2 ${isMyFave ? "text-red-400" : "text-gray-400"}`}
        onClick={() => handleToggleFave(name)}
      >
        <FontAwesomeIcon icon={isMyFave ? faHeart : faHeartLight} />
      </button>
      {isMyFave && (
        <Rating
          totalStars={5}
          initialRating={userRating}
          onRatingChange={(newRating) => handleRatingChange(name, newRating)}
        />
      )}
    </div>
  );
};

//Prop Types validation
AnimalListFaveAndRating.propTypes = {
  name: PropTypes.string.isRequired,
  isMyFave: PropTypes.bool,
  userRating: PropTypes.number,
};
export default AnimalListFaveAndRating;
