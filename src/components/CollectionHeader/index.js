import React from 'react';
import PropTypes from 'prop-types';

import Styled from './styles';

const CollectionHeader = props => (
  <Styled.Container>
    <Styled.Inner
      handle={props.collection.handle}
      imgSm={props.collection.image.small}
      imgLg={props.collection.image.large}
    >
      <Styled.Heading>{props.collection.title}</Styled.Heading>
      <Styled.Description>{props.collection.description}</Styled.Description>
    </Styled.Inner>
  </Styled.Container>
);

CollectionHeader.propTypes = {
  collection: PropTypes.object,
};

export default CollectionHeader;
