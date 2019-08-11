import React, { Fragment } from 'react';

import * as Styled from './styles';

interface CollectionHeaderProps {
  collection: ShopifyBuy.Collection;
}

const CollectionHeader: React.FunctionComponent<CollectionHeaderProps> = ({ collection }) => {
  if (!collection) {
    return null;
  }

  const image = collection.image ? collection.image.src : '';

  return (
    <Fragment>
      <Styled.Inner handle={collection.handle} imgSm={image} imgLg={image}>
        <Styled.Heading>{collection.title}</Styled.Heading>
        <Styled.Description>{collection.body_html}</Styled.Description>
      </Styled.Inner>
    </Fragment>
  );
};

export default CollectionHeader;
