import React from 'react';

const Container = ({ children, ...props }) => (
  <div className={`container ${props.classes}`} children={children} {...props} />
);

export const ContainerFluid = ({ children }) => {
  return <div className='container-fluid' children={children} />;
};

export const SubContainer = ({ children, ...props }) => (
  <div className={`container-sub ${props.classes}`} children={children} {...props} />
);
export default Container;
