import * as React from 'react';
import Meta from 'containers/Meta';
import Video from 'components/Video';
import StoreHours from 'components/StoreHours';
import FeaturedProduct from 'components/FeaturedProduct';

const HomePage = (props: { featuredProduct?: Product }) => {
  const { featuredProduct } = props;

  return (
    <div>
      <Meta title="Lineage Coffee Roasting • Orlando, FL" />
      <Video />
      {featuredProduct && <FeaturedProduct featuredProduct={featuredProduct} />}
      <StoreHours />
    </div>
  );
};

export default HomePage;
