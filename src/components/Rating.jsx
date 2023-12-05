import { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarLight } from "@fortawesome/free-regular-svg-icons";

const Rating = ({
  totalStars = 5,
  initialRating = 0,
  onRatingChange,
  // for disabling the click behavior for favorite list
  disabled = false,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <FontAwesomeIcon
          data-testid="star-icon"
          //data-testid={`star-${index}`}
          key={index}
          icon={index < rating ? faStar : faStarLight}
          onClick={() => !disabled && handleStarClick(index + 1)}
          className={`${index < rating ? "text-yellow-300" : "text-gray-400"} ${
            !disabled && "cursor-pointer"
          }`}
        />
      ))}
    </div>
  );
};

// PropTypes validation
Rating.propTypes = {
  totalStars: PropTypes.number,
  initialRating: PropTypes.number,
  onRatingChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Rating;
