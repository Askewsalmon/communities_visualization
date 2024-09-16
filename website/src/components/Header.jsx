import PropTypes from "prop-types";
import Button from "./Button";
const Header = ({ mode, setMode }) => {
  return (
    <header className="bg-slate-950 w-full fixed z-40">
      <div className="container h-16 flex p-4 mx-auto">
        <div className="flex ml-auto border-white border-solid rounded-lg border h-fit">
          <Button
            label="Clique"
            onClick={() => setMode("cliques")}
            active={mode == "cliques"}
          />
          <Button
            label="Community"
            isRight
            onClick={() => setMode("community")}
            active={mode === "community"}
          />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default Header;
