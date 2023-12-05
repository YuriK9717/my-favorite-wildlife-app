import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const FavoriteAnimalListCharacteristics = ({
  animal,
  characteristics,
  preference,
}) => {
  return (
    <div className="flex flex-row items-center gap-[.2rem]">
      <FontAwesomeIcon className="text-[.4rem]" icon={faCircle} /> You do{" "}
      {preference} about <b className="text-blue-700">{animal}</b> :{" "}
      {characteristics.map((characteristic, index) => {
        const displayName = characteristic.replaceAll("_", " ");
        return (
          <div className="capitalize" key={displayName}>
            {displayName} {index < characteristics.length - 1 && ","}
          </div>
        );
      })}
    </div>
  );
};

// PropTypes validation
FavoriteAnimalListCharacteristics.propTypes = {
  animal: PropTypes.string.isRequired,
  characteristics: PropTypes.array.isRequired,
  preference: PropTypes.string.isRequired,
};

export default FavoriteAnimalListCharacteristics;
