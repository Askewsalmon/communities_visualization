import PropTypes from "prop-types";
import Header from "../components/Header";
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-slate-500">
        <div className="container mx-auto pt-6">{children}</div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
