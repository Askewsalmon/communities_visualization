import PropTypes from "prop-types";
import Header from "../components/Header";
const Layout = ({ children, mode, setMode }) => {
  return (
    <>
      <Header mode={mode} setMode={setMode} />
      <div className="w-full bg-slate-500">
        <div className="container mx-auto pt-6">{children}</div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default Layout;
