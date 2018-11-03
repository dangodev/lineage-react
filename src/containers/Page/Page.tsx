import * as React from 'react';
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
  about: 'About Us • Lineage Coffee Roasting',
  learn: 'Brew guides & Education • Lineage Coffee Roasting',
  wholesale: 'Wholesale Partners • Lineage Coffee Roasting',
  'privacy-policy': 'Privacy Policy • Lineage Coffee Roasting',
};

class PageContainer extends React.Component {
  componentWillMount() {
    this.scrollUp();
  }

  componentDidUpdate(prevProps: { location: Location }) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.scrollUp();
    }
  }

  scrollUp() {
    window.scrollTo(0, 0);
  }

  render() {
    const page = pages[this.props.page];

    if (page) {
      return (
        <React.Fragment>
          <Meta title={pageTitles[this.props.page]} key="meta" />
          {React.createElement(page, { ...this.props, key: 'page' })}
        </React.Fragment>
      );
    }
    return <FourOhFour />;
  }
}

export default PageContainer;
