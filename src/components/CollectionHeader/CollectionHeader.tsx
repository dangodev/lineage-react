import * as React from 'react';

import * as Styled from './styles';

const CollectionHeader = ({ collection }) => {
  if (!collection) {
    return null;
  }

  const image = collection.image ? collection.image.src : '';

  return (
    <div>
      <Styled.Inner handle={collection.handle} imgSm={image} imgLg={image}>
        <Styled.Heading>{collection.title}</Styled.Heading>
        <Styled.Description>{collection.description}</Styled.Description>
      </Styled.Inner>
    </div>
  );
};

export default CollectionHeader;
