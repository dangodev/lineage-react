import React from 'react';
import PropTypes from 'prop-types';

import Meta from 'containers/Meta';
import Video from 'components/Video';
import StoreHours from 'components/StoreHours';
import FeaturedProduct from 'components/FeaturedProduct';

const HomePage = (props) => {
  const featured = props.allProducts.find(({ collections }) => collections.indexOf('frontpage') !== -1);

  return (
    <div>
      <Meta title="Lineage Coffee Roasting • Orlando, FL" />
      <Video />
      <FeaturedProduct featuredProduct={featured} />
      <StoreHours />
    </div>
  );
};

HomePage.propTypes = {
  allProducts: PropTypes.array.isRequired,
};

export default HomePage;
