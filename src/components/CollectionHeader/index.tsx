import React from 'react';

import * as Styled from './styles';

interface CollectionHeaderProps {
  collection?: any;
}

const CollectionHeader: React.FunctionComponent<CollectionHeaderProps> = ({ collection }) => {
  if (!collection) {
    return null;
  }

  const image = collection.image ? collection.image.src : '';

  return (
    <>
      <Styled.Inner handle={collection.handle} imgSm={image} imgLg={image}>
        <Styled.Heading>{collection.title}</Styled.Heading>
        <Styled.Description>{collection.description}</Styled.Description>
      </Styled.Inner>
    </>
  );
};

export default CollectionHeader;
