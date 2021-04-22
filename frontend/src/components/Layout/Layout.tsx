import React from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <React.Fragment>
      <Header />
      <main className="mb-auto">{props.children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
