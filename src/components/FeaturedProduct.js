import React from 'react';
import glamorous from 'glamorous';

import { color, grid } from '../lib/theme';

import clipPath from '../assets/bag-clip.svg';
import speckle from '../assets/speckle.png';
import bagGreen from '../assets/bag-green.jpg';

const FeaturedProduct = () => (
  <Container>
    <Bag src={bagGreen} />
  </Container>
);

const Container = glamorous.div({
  backgroundColor: `rgb(${color.green})`,
  backgroundImage: `url(${speckle})`,
  backgroundRepeat: 'repeat',
  backgroundSize: '400px auto',
  paddingBottom: 2 * grid,
  paddingTop: 2 * grid,
});

const Bag = glamorous.img({
  clipPath: `url(${clipPath}#clip)`,
  height: 'auto',
  width: 4 * grid,
});

export default FeaturedProduct;
