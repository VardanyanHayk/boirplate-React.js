import React, { Suspense, lazy } from 'react';
import Spinner from '../spin';

export default (importFunc) => {
  const Component = lazy(importFunc);
  return (props) => (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );
};
