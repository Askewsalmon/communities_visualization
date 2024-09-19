import PropTypes from "prop-types";
import Button from "./Button";
import Select from "./Select";
const Header = ({
  mode,
  setMode,
  visualizationMode,
  selectOptions,
  graphName,
  setGraphName,
  setVisualizationMode,
}) => {
  return (
    <header className="bg-transparent w-full fixed z-40">
      <div className="container h-16 flex p-4 mx-auto">
        <div className="flex ml-auto ">
          <Select
            selectOptions={selectOptions}
            value={graphName}
            onChange={(value) => setGraphName(value)}
          />
          <div className="flex border-white border-solid rounded-lg border h-fit mr-6">
            <Button
              label="2D Graph"
              onClick={() => setVisualizationMode("2D")}
              active={visualizationMode == "2D"}
            />
            <Button
              label="3D Graph"
              isRight
              onClick={() => setVisualizationMode("3D")}
              active={visualizationMode === "3D"}
            />
          </div>
          <div className="border-white border-solid rounded-lg border h-fit">
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
      </div>
    </header>
  );
};

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  visualizationMode: PropTypes.string.isRequired,
  setVisualizationMode: PropTypes.func.isRequired,
  selectOptions: PropTypes.array.isRequired,
  graphName: PropTypes.string.isRequired,
  setGraphName: PropTypes.func.isRequired,
};

export default Header;
