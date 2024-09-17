import PropTypes from "prop-types";
import Header from "../components/Header";
const Layout = ({
  children,
  mode,
  setMode,
  visualizationMode,
  setVisualizationMode,
}) => {
  return (
    <>
      <Header
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
  children: PropTypes.node.isRequired,
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  visualizationMode: PropTypes.string.isRequired,
  setVisualizationMode: PropTypes.func.isRequired,
};

export default Layout;
