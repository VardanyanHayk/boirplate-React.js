import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import RootRouter from 'routes/root';
// import ScrollToTop from 'shared/scrollRestoration';
import ErrorBoundary from 'shared/errorBoundary';
import moment from 'moment';
import { languages } from 'constants/localization';
import { getLocalization } from 'utils/helpers';

const App = () => {
  useEffect(() => {
    const code = getLocalization();
    const currentL = code ? languages[code].locale : null;
    moment.locale(currentL);
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          {/* <ScrollToTop /> */}
          <RootRouter />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
