import React from 'react';
import { Layout } from 'antd';
import Image from 'shared/image';
import withMeta from 'shared/hoc/withMeta';
import Carousel from 'shared/carousel';
import Card from 'shared/card';
import Container from 'shared/layout/container';

const { Header } = Layout;

const HomePage = () => {
  return (
    <Container>
      <Carousel />
      <Card />
      {/* <Image.Static  src='https://uic.am/wp-content/uploads/2017/03/AJ-06-nkar.jpg' /> */}
    </Container>
  );
};

const WrapperHomepage = withMeta(HomePage);
export default WrapperHomepage;
