import React from 'react';
import { Card, Row, Col } from 'antd';
import ImageGallery from 'react-image-gallery';

const { Meta } = Card;
const images = [
  {
    original: 'https://www.dreamworksautohouse.co.za/wp-content/uploads/2017/10/logo.png',
    thumbnail: 'https://www.dreamworksautohouse.co.za/wp-content/uploads/2017/10/logo.png',
  },
  {
    original: 'https://www.dreamworksautohouse.co.za/wp-content/uploads/2017/10/logo.png',
    thumbnail: 'https://www.dreamworksautohouse.co.za/wp-content/uploads/2017/10/logo.png',
  },
  {
    original: 'https://www.dreamworksautohouse.co.za/wp-content/uploads/2017/10/logo.png',
    thumbnail: 'https://www.dreamworksautohouse.co.za/wp-content/uploads/2017/10/logo.png',
  },
];
const CardComponent = ({ data=images }) => {
  return (
    <Row className='cardMain'>
      {data?.map((it, key) => {
        return (
          <Col key={key} xs={24} md={12} xl={8} xxl={6}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<ImageGallery showPlayButton={false} showFullscreenButton={false} items={images} />}
            >
              <Meta
                title='Europe Street beat'
                description='www.instagram.com'
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default CardComponent;
