import React from 'react';

import About from '../pages/About';
import FourOhFour from '../pages/404';
import Learn from '../pages/Learn';
import Wholesale from '../pages/Wholesale';

const pages = {
  about: About,
  learn: Learn,
  wholesale: Wholesale,
};

const PageContainer = props => pages[props.match.params.slug]
  ? React.createElement(pages[props.match.params.slug])
  : <FourOhFour />;

export default PageContainer;
