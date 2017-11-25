import React from 'react';
import PropTypes from 'prop-types';

import About from 'pages/About';
import FourOhFour from 'pages/404';
import Learn from 'pages/Learn';
import Wholesale from 'pages/Wholesale';

const pages = {
  about: About,
  learn: Learn,
  wholesale: Wholesale,
};

class PageContainer extends React.Component {
  componentWillReceiveUpdate(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const page = pages[this.props.match.params.slug];

    if (page) {
      return React.createElement(page, this.props);
    }
    return <FourOhFour />;
  }
}

PageContainer.defaultProps = {
  match: undefined,
};

PageContainer.propTypes = {
  allProducts: PropTypes.array.isRequired,
  match: PropTypes.object,
};

export default PageContainer;
