import PropTypes from "prop-types";

import AnimalListFaveAndRating from "./AnimalListFaveAndRating";
import AnimalListCharacteristics from "./AnimalListCharacteristics";

const AnimalsListContent = ({
  name,
  expandedItem,
  isMyFave,
  userRating,
  characteristics,
  likedCharacteristics,
  dislikedCharacteristics,
}) => {
  return  expandedItem === name && (
    <div
      className="text-sm text-slate-600 border-b border-solid border-slate-100"
    >
      <AnimalListFaveAndRating
        name={name}
        isMyFave={isMyFave}
        userRating={userRating}
      />

      {isMyFave && userRating ? (
        <AnimalListCharacteristics
          name={name}
          characteristics={characteristics}
          likedCharacteristics={likedCharacteristics}
          dislikedCharacteristics={dislikedCharacteristics}
        />
      ) : null}
    </div>
  );
};

// PropTypes validation
AnimalsListContent.propTypes = {
  name: PropTypes.string.isRequired,
  expandedItem: PropTypes.string,
  isMyFave: PropTypes.bool,
  userRating: PropTypes.number,
  characteristics: PropTypes.object.isRequired,
  likedCharacteristics: PropTypes.array,
  dislikedCharacteristics: PropTypes.array,
};

export default AnimalsListContent;
