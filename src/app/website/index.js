import { Layout } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import withAsync from 'shared/hoc/withLazy';
import WebsiteRouter from 'routes/website';
// import ScrollToTop from 'shared/scrollRestoration';
const { Content } = Layout;
// const QuoteLoader = withAsync(() => import('shared/quoteLoaders'));
const HeaderComponent = withAsync(() => import('shared/layout/header'));
const FooterComponent = withAsync(() => import('shared/layout/footer'));

const QUOTE_SHOW_TIME = 5000;
const LOAD_PAGE_AFTER = 1000;

const MainComponent = () => {
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  // useEffect(() => {
  //   // hide scroll bar
  //   document.body.style.overflow = 'hidden';
  //   setTimeout(() => {
  //     setPageVisible(true);
  //   }, LOAD_PAGE_AFTER);

  //   setTimeout(() => {
  //     document.body.style.overflow = 'auto';
  //     setQuoteVisible(false);
  //   }, QUOTE_SHOW_TIME);
  // }, []);

  return (
    <Fragment>
      {/* <QuoteLoader visible={quoteVisible} /> */}
      {pageVisible ? (
        <Fragment>
          <HeaderComponent />
          <Content className='main' children={<WebsiteRouter />} />
          <FooterComponent />
        </Fragment>
      ) : null}
    </Fragment>
  );
};
export default MainComponent;
