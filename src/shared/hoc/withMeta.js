import React, { Fragment } from "react";
import { Helmet } from "react-helmet-async";

const withMeta = (WrappedComponent, args) => {
  return (props) => {
    return (
      <Fragment>
        <Helmet>
          <title>My Title</title>
          <meta name='description' content='description' />
        </Helmet>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default withMeta;
