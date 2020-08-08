import Img from 'react-image';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import BrokenImage from 'assets/etc/broken-image.png';
const loadIcon = <LoadingOutlined />;
const { REACT_APP_API_ROOT } = process.env;
const makeUrl = (sources) => sources.map((src) => (!!src ? `${REACT_APP_API_ROOT}/${src}` : BrokenImage));

// use ImageDynamic to handle image urls provided from back-end
const Dynamic = ({ src, fb1, fb2, alt = '', ...props }) => (
  <Img src={makeUrl([src, fb1, fb2])} alt={alt} loader={loadIcon} unloader={<img src={BrokenImage} />} {...props} />
);

// use ImageStatic to handle image urls local/absolute ...
const Static = ({ src, fb1, fb2, alt = '', ...props }) => (
  <Img src={[src, fb1, fb2]} alt={alt} loader={loadIcon} {...props} unloader={<img src={BrokenImage} />} />
);

export default { Dynamic, Static };
