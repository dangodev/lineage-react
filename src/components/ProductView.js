import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

import { color, font, grid, layer } from '../lib/theme';

/**
 * Template
 */

const ProductView = props => (
  <Container>
    <Grid>
      <Modal>
        <StyledLink to={props.returnTo}>✕</StyledLink>
        <Title>{props.product.title}</Title>
        <div dangerouslySetInnerHTML={{ __html: props.product.description }} />
      </Modal>
    </Grid>
    <Overlay />
  </Container>
);

ProductView.defaultProps = {
  returnTo: '\\',
};

ProductView.propTypes = {
  product: PropTypes.object.isRequired,
  returnTo: PropTypes.string,
};

/**
 * Styles
 */

const Container = glamorous.div({
});

const Grid = glamorous.div({
  display: 'grid',
  gridColumnGap: 0.5 * grid,
  gridTemplateColumns: 'repeat(12, 1fr)',
  position: 'absolute',
  zIndex: layer.modal + 1,
});

const Modal = glamorous.div({
  backgroundColor: `rgb(${color.white})`,
  display: 'block',
  gridColumnEnd: 11,
  gridColumnStart: 3,
  padding: grid,
  position: 'relative',
  top: '12.5vw',
});

const StyledLink = glamorous(Link)({
  color: `rgb(${color.black})`,
  display: 'block',
  fontWeight: 500,
  position: 'absolute',
  right: 0.5 * grid,
  textDecoration: 'none',
  top: 0.5 * grid,
});

const Overlay = glamorous.div({
  backgroundColor: `rgba(${color.black}, 0.4)`,
  bottom: 0,
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: layer.modal,
});

const Title = glamorous.h1({
  fontSize: font.up2,
  lineHeight: 1,
  textTransform: 'uppercase',
});

export default ProductView;
