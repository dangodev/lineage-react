/**
 * Deps
 */

import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';

import ProductCard from './ProductCard';

import clipPath from '../assets/bag-clip.svg';
import speckle from '../assets/speckle.png';

/**
 * Template
 */

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const date = new window.Date();
const thisMonth = months[date.getMonth()];
const thisYear = date.getFullYear();

const FeaturedProduct = props => (
  <Container>
    <Grid>
      <Content>
        <Heading>Featured Product <small>{thisMonth} {thisYear}</small></Heading>
        <ProductCard product={props.featuredProduct} />
      </Content>
    </Grid>
  </Container>
);

FeaturedProduct.propTypes = {
  featuredProduct: PropTypes.object,
};

/**
 * Styles
 */

const Container = glamorous.div({
  backgroundColor: `rgb(${color.green})`,
  backgroundImage: `linear-gradient(rgb(250, 196, 170), rgb(255, 182, 170)), url(${speckle})`,
  backgroundPosition: '0 0, 0 0',
  backgroundRepeat: 'repeat-x, repeat',
  backgroundSize: `100% ${4 * grid}px, 400px auto`,
  paddingBottom: 2 * grid,
  paddingTop: grid,
});

const Content = glamorous.div({
  backgroundColor: color.white,
  gridColumnEnd: 11,
  gridColumnStart: 3,

  '@media (min-width: 600px)': {
    gridColumnEnd: 10,
    gridColumnStart: 4,
  }
});

const Grid = glamorous.div({
  alignItems: 'center',
  display: 'grid',
  gridColumnGap: 0.5 * grid,
  gridTemplateColumns: 'repeat(12, 1fr)',
});

const Heading = glamorous.h1({
  fontFamily: font.kaufmann,
  fontSize: font.up3,
  lineHeight: 1,
  marginTop: 0,
  marginBottom: grid,
  textAlign: 'center',

  '@media (min-width: 600px)': {
    fontSize: font.up5,
  },

  ' & small': {
    display: 'block',
    fontFamily: font.din,
    fontSize: font.down5,
    fontWeight: 500,
    textTransform: 'uppercase',
  },
});

export default FeaturedProduct;
