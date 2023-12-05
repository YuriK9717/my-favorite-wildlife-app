import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const AnimalsListTitle = ({ expandedItem, name, handleToggle }) => {
  return (
    <div className="mb-0 hover:bg-slate-200">
      <button
        className="relative flex items-center w-full p-4 font-semibold text-left border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
        onClick={() => handleToggle(name)}
      >
        <span>{name}</span>
        <FontAwesomeIcon
          className="absolute right-0 pt-1 text-xs fa fa-plus group-open:opacity-0"
          icon={expandedItem === name ? faCaretUp : faCaretDown}
        />
      </button>
    </div>
  );
};

// PropTypes validation
AnimalsListTitle.propTypes = {
  expandedItem: PropTypes.string,
  name: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
};
export default AnimalsListTitle;
