import React, { Fragment } from 'react';
import Container from 'shared/layout/container';
import Breadcrumb from 'shared/breadcrumb';
import Hashtags from 'shared/hashtags';
import ShareSocial from 'shared/shareSocial';
import { Row } from 'antd';

const withPage = ({ Component, WithShareSocial = true }) => () => {
  // actions
  return (
    <Fragment>
      <Container>
        <Breadcrumb />
      </Container>
      <Component />
      {WithShareSocial ? (
        <Container>
          <Row type='flex' justify='end'>
            <ShareSocial classes='mt-100' />
          </Row>
        </Container>
      ) : null}
      <Hashtags />
    </Fragment>
  );
};

export default withPage;
