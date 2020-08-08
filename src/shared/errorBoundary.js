import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
// import FailScreen from 'shared/failScreen';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    console.log('error', error);
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }
  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    return hasError ? (
      <Fragment>
        {/* <FailScreen /> */}
      </Fragment>
    ) : (
      children
    );
  }
}
export default ErrorBoundary;
