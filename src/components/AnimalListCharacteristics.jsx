import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import LikeAndDislikeButton from "./LikeAndDislikeButton";

const AnimalListCharacteristics = ({
  name,
  characteristics,
  likedCharacteristics,
  dislikedCharacteristics,
}) => {
  return (
    <div className="px-4 pb-4 leading-relaxed text-blue-gray-500/80">
      <div>
        Which characteristics of {name} do you like?{" "}
        <FontAwesomeIcon className="px-1" icon={faFaceSmile} />
      </div>
      {Object.entries(characteristics)
        .slice(0, 10)
        .map(([characteristic, value]) => {
          // clean up the characteristic name
          const displayCharacteristic = characteristic.replaceAll("_", " ");
          return (
            <div key={characteristic}>
              <span className="font-semibold capitalize">
                {displayCharacteristic}
              </span>
              : {value}
              <LikeAndDislikeButton
                name={name}
                characteristic={characteristic}
                likedCharacteristics={likedCharacteristics}
                dislikedCharacteristics={dislikedCharacteristics}
                preference={"like"}
              />
              <LikeAndDislikeButton
                name={name}
                characteristic={characteristic}
                likedCharacteristics={likedCharacteristics}
                dislikedCharacteristics={dislikedCharacteristics}
                preference={"dislike"}
              />
            </div>
          );
        })}
    </div>
  );
};

// PropTypes validation
AnimalListCharacteristics.propTypes = {
  name: PropTypes.string.isRequired,
  characteristics: PropTypes.object.isRequired,
  likedCharacteristics: PropTypes.array,
  dislikedCharacteristics: PropTypes.array,
};
export default AnimalListCharacteristics;
