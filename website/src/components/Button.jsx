import PropTypes from "prop-types";

const Button = ({ label, onClick, active, isRight }) => {
  return (
    <button
      className={`px-1 h-8 w-20 text-white focus:outline-none focus:ring ${
        active
          ? "bg-orange-500 hover:bg-orange-600 focus:ring-orange-300"
          : "bg-transparent hover:bg-orange-800 focus:ring-orange-300"
      } ${isRight ? "rounded-r-lg" : "rounded-l-lg"}`}
      onClick={onClick}
    >
      <p className="text-sm">{label}</p>
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  isRight: PropTypes.bool,
};

export default Button;
