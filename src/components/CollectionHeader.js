import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

import { color, font, grid } from '../lib/theme';

const CollectionHeader = (props) => (
  <Container>
    <Inner>
      <Heading>{props.collection.title}</Heading>
      <Description>{props.collection.description}</Description>
    </Inner>
  </Container>
);

CollectionHeader.propTypes = {
  collection: PropTypes.object,
};

/**
 * Styles
 */

const Container = glamorous.div({
});

const Inner = glamorous.div({
  backgroundColor: `rgb(${color.white})`,
  paddingTop: 2 * grid,
  paddingBottom: 2 * grid,
});

const Heading = glamorous.h1({
  fontFamily: font.kaufmann,
  fontSize: font.up8,
  marginBottom: 0,
  marginTop: 0,
  textAlign: 'center',
});

const Subheading = glamorous.h3({
  fontFamily: font.kaufmann,
  fontSize: font.up4,
  marginBottom: grid,
  marginTop: grid,
  textAlign: 'center',
});

const Description = glamorous.p({
  lineHeight: 1.5,
  marginBottom: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: grid,
  maxWidth: '40em',
  textAlign: 'center',
});

export default CollectionHeader;
