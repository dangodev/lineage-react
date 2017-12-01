import React from 'react';
import PropTypes from 'prop-types';

import Meta from 'containers/Meta';
import About from 'pages/About';
import FourOhFour from 'pages/404';
import Learn from 'pages/Learn';
import Wholesale from 'pages/Wholesale';

const pages = {
  about: About,
  learn: Learn,
  wholesale: Wholesale,
};

const pageTitles = {
  about: "About Us • Lineage Coffee Roasting",
  learn: "Brew guides & Education • Lineage Coffee Roasting",
  wholesale: "Wholesale Partners • Lineage Coffee Roasting",
};

class PageContainer extends React.Component {
  componentWillMount() {
    this.scrollUp();
  }

  componentWillReceiveUpdate(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.scrollUp();
    }
  }

  scrollUp() {
    window.scrollTo(0, 0);
  }

  render() {
    const page = pages[this.props.match.params.slug];

    if (page) {
      return [
        <Meta title={pageTitles[this.props.match.params.slug]} />,
        React.createElement(page, this.props),
      ];
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
