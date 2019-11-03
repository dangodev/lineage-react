import React from 'react';

import Meta from '../../containers/Meta';
import Video from '../../components/Video';
import StoreHours from '../../components/StoreHours';
import FeaturedProduct from '../../components/FeaturedProduct';

interface HomeProps {
  featuredProduct?: any;
}

const HomePage: React.FunctionComponent<HomeProps> = ({ featuredProduct }) => {
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
