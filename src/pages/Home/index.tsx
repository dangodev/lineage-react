import React from 'react';

import Meta from 'containers/Meta';
import Video from 'components/Video';
import StoreHours from 'components/StoreHours';
import FeaturedProduct from 'components/FeaturedProduct';

interface HomePageProps {
  featuredProduct?: ShopifyCustom.Product;
}

const HomePage: React.FunctionComponent<HomePageProps> = ({ featuredProduct }) => {
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
