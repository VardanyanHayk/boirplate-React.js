import { Spin } from 'antd';
import React from 'react';
// import Image from 'shared/image';
// import LoadIcon from 'assets/spinner.png';

const Spinner = () => (
  <div className='loader'>
    <Spin  />
  </div>
);

// export const AdminSpinner = (props) => (
//   <div className='admin-loader'>
//     <Spin size='large' {...props} spinning={true} />
//   </div>
// );

// export const StaticSpinner = () => (
//   <div className='loader-static'>
//     <Spin indicator={<Image.Static src={LoadIcon} />} />
//   </div>
// );

export default Spinner;
