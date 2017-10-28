import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

import { color, font, grid } from '../lib/theme';

const CollectionHeader = props => (
  <Container>
    {props.collection.handle === 'coffee' &&
      <Header>Lineage Coffee</Header>
    }
    <Description>
      Enjoy our ethically-sourced, award-winning roasts at our coffee bar or at
      home. Available by the bag, or as a convenient home delivery
      subscription.
    </Description>
  </Container>
);

CollectionHeader.propTypes = {
  collection: PropTypes.object,
};

const Container = glamorous.div({
  backgroundColor: `rgb(${color.white})`,
  paddingTop: 2 * grid,
  paddingBottom: 2 * grid,
});

const Header = glamorous.h1({
  fontFamily: font.kaufmann,
  fontSize: font.up8,
  marginBottom: 0,
  marginTop: 0,
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
