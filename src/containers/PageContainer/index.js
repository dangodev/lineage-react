import React from 'react';
import PropTypes from 'prop-types';

import Meta from 'containers/Meta';
import About from 'pages/About';
import FourOhFour from 'pages/404';
import Learn from 'pages/Learn';
import PrivacyPolicy from 'pages/PrivacyPolicy';
import Wholesale from 'pages/Wholesale';

const pages = {
  about: About,
  learn: Learn,
  wholesale: Wholesale,
  'privacy-policy': PrivacyPolicy,
};

const pageTitles = {
  about: "About Us • Lineage Coffee Roasting",
  learn: "Brew guides & Education • Lineage Coffee Roasting",
  wholesale: "Wholesale Partners • Lineage Coffee Roasting",
  'privacy-policy': "Privacy Policy • Lineage Coffee Roasting",
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
        <Meta title={pageTitles[this.props.match.params.slug]} key="meta" />,
        React.createElement(page, { ...this.props, key: 'page' }),
      ];
    }
    return <FourOhFour />;
  }
}

PageContainer.defaultProps = {
  match: undefined,
  privacyPolicy: '',
};

PageContainer.propTypes = {
  allProducts: PropTypes.array.isRequired,
  match: PropTypes.object,
  privacyPolicy: PropTypes.string,
};

export default PageContainer;
