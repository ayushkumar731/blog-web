import React from 'react';
import { withRouter } from 'next/router';

const CustomRoute = (props: any) => {
  const {
    router,
    render,
    component,
    ...otherProps
  } = props;
  const Render = component || render;
  if (!Render) return null;
  return <Render location={router} {...otherProps} />;
};

export default withRouter(CustomRoute);
