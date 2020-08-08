import React from 'react';
import { Carousel, Row, Col } from 'antd';
import Image from 'shared/image';
const contentStyle = {
  height: '500px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const mokeData = [
  {
    image: 'https://uic.am/wp-content/uploads/2017/03/AJ-06-nkar.jpg',
    text: 'text',
  },
  { image: 'https://www.dreamworksautohouse.co.za/wp-content/uploads/2017/10/logo.png', text: 'text' },
  { image: '', text: 'text' },
];

const CarouselComponent = ({ data = mokeData }) => {
  return (
    <Carousel className='carouselMain' autoplay>
      {data?.map((it, key) => (
        <Row key={key}>
          <Col className='body'>
            <Col className='image'>
            <Image.Static src={it.image} />
            </Col>
            <h3 className='text'>Text</h3>
          </Col>
        </Row>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
