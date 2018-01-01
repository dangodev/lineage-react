import React from "react";
import PropTypes from "prop-types";

import Meta from "containers/Meta";
import Video from "components/Video";
import StoreHours from "components/StoreHours";
import FeaturedProduct from "components/FeaturedProduct";

const HomePage = props => {
  return (
    <div>
      <Meta title="Lineage Coffee Roasting • Orlando, FL" />
      <Video />
      {props.featuredProduct && (
        <FeaturedProduct featuredProduct={props.featuredProduct} />
      )}
      <StoreHours />
    </div>
  );
};

HomePage.defaultProps = {
  featuredProduct: undefined
};

HomePage.propTypes = {
  featuredProduct: PropTypes.object
};

export default HomePage;
