import React from 'react';
import { RouteComponentProps } from 'react-router';

import Meta from 'containers/Meta';
import About from 'pages/About';
import FourOhFour from 'pages/404';
import Learn from 'pages/Learn';
import PrivacyPolicy from 'pages/PrivacyPolicy';
import Wholesale from 'pages/Wholesale';

const pages: { [index: string]: any } = {
  about: About,
  learn: Learn,
  wholesale: Wholesale,
  'privacy-policy': PrivacyPolicy,
};

const pageTitles: { [index: string]: string } = {
  about: 'About Us • Lineage Coffee Roasting',
  learn: 'Brew guides & Education • Lineage Coffee Roasting',
  wholesale: 'Wholesale Partners • Lineage Coffee Roasting',
  'privacy-policy': 'Privacy Policy • Lineage Coffee Roasting',
};

interface PageContainerProps extends RouteComponentProps {
  privacyPolicy: string;
}

class PageContainer extends React.Component<PageContainerProps> {
  componentDidMount() {
    this.scrollUp();
  }

  UNSAFE_componentWillReceiveUpdate(nextProps: PageContainerProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.scrollUp();
    }
  }

  scrollUp() {
    window.scrollTo(0, 0);
  }

  render() {
    const { match, privacyPolicy = '', ...props } = this.props;
    const { slug } = match.params as { [key: string]: string };
    if (!slug) {
      return <FourOhFour />;
    }

    const page = pages[slug];

    if (page) {
      return [
        <Meta title={pageTitles[slug]} key="meta" />,
        React.createElement(page, { ...props, key: 'page' }),
      ];
    }
    return <FourOhFour />;
  }
}

export default PageContainer;
