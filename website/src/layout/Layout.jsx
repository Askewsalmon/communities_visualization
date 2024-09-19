import PropTypes from "prop-types";
import Header from "../components/Header";
const Layout = ({
  children,
  selectOptions,
  graphName,
  setGraphName,
  mode,
  setMode,
  visualizationMode,
  setVisualizationMode,
}) => {
  return (
    <>
      <Header
        selectOptions={selectOptions}
        graphName={graphName}
        setGraphName={setGraphName}
        mode={mode}
        setMode={setMode}
        visualizationMode={visualizationMode}
        setVisualizationMode={setVisualizationMode}
      />
      <div className="w-full bg-slate-500">
        <div className="container mx-auto">{children}</div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.string,
  setMode: PropTypes.func,
  visualizationMode: PropTypes.string,
  setVisualizationMode: PropTypes.func,
  selectOptions: PropTypes.array,
  graphName: PropTypes.string,
  setGraphName: PropTypes.func,
};

export default Layout;
