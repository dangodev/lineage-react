import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles';

const CollectionHeader = props => {
  if (!props.collection) {
    return false;
  }

  const image = props.collection.image ? props.collection.image.src : '';

  return (
    <Fragment>
      <Styled.Inner handle={props.collection.handle} imgSm={image} imgLg={image}>
        <Styled.Heading>{props.collection.title}</Styled.Heading>
        <Styled.Description>{props.collection.description}</Styled.Description>
      </Styled.Inner>
    </Fragment>
  );
};

CollectionHeader.propTypes = {
  collection: PropTypes.object,
};

export default CollectionHeader;
