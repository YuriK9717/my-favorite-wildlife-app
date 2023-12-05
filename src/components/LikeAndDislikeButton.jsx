import { useContext } from "react";
import { UserData } from "../contexts/GlobalContext";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as faThumbsUpLight,
  faThumbsDown as faThumbsDownLight,
} from "@fortawesome/free-regular-svg-icons";

const LikeAndDislikeButton = ({
  name,
  characteristic,
  likedCharacteristics,
  dislikedCharacteristics,
  preference,
}) => {
  const { setFaveAnimalStates } = useContext(UserData);

  // Specify the icon type to display based on user preferences
  const defineIcons =
    preference === "like"
      ? likedCharacteristics && likedCharacteristics.includes(characteristic)
        ? faThumbsUp
        : faThumbsUpLight
      : dislikedCharacteristics &&
        dislikedCharacteristics.includes(characteristic)
      ? faThumbsDown
      : faThumbsDownLight;

  const handleCharacteristicLikeAndDislike = (
    animalName,
    characteristic,
    preference
  ) => {
    setFaveAnimalStates((prevStates) => {
      const animalState = prevStates[animalName];

      if (!animalState) {
        // handle the case where the animal state is not defined
        return prevStates;
      }
      const likedCharacteristics = animalState.likedCharacteristics || [];
      const dislikedCharacteristics = animalState.dislikedCharacteristics || [];

      let updatedLikedCharacteristics = [];
      let updatedDislikedCharacteristics = [];

      if (preference === "like") {
        // handle the case for unselecting like button
        updatedLikedCharacteristics = likedCharacteristics.includes(
          characteristic
        )
          ? likedCharacteristics.filter((liked) => liked !== characteristic)
          : [...likedCharacteristics, characteristic];

        // handle the case when user clicks the like button after disliked it
        updatedDislikedCharacteristics = dislikedCharacteristics.filter(
          (liked) => liked !== characteristic
        );
      }
      if (preference === "dislike") {
        // handle the case for unselecting dislike button
        updatedDislikedCharacteristics = dislikedCharacteristics.includes(
          characteristic
        )
          ? dislikedCharacteristics.filter((liked) => liked !== characteristic)
          : [...dislikedCharacteristics, characteristic];
        // handle the case when user clicks the dislike button after liked it
        updatedLikedCharacteristics = likedCharacteristics.filter(
          (liked) => liked !== characteristic
        );
      }
      return {
        ...prevStates,
        [animalName]: {
          ...animalState,
          likedCharacteristics: updatedLikedCharacteristics,
          dislikedCharacteristics: updatedDislikedCharacteristics,
        },
      };
    });
  };
  return (
    <button
      className="pl-2"
      onClick={() =>
        handleCharacteristicLikeAndDislike(name, characteristic, preference)
      }
    >
      <FontAwesomeIcon icon={defineIcons} />
    </button>
  );
};

// Prop Types validation
LikeAndDislikeButton.propTypes = {
  name: PropTypes.string.isRequired,
  characteristic: PropTypes.string.isRequired,
  likedCharacteristics: PropTypes.array,
  dislikedCharacteristics: PropTypes.array,
  preference: PropTypes.string.isRequired,
};
export default LikeAndDislikeButton;
