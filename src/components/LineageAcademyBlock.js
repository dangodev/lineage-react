import React from 'react';
import glamorous from 'glamorous';

import Button from './Button';
import Waves from './Waves';

import { color, font, grid } from '../lib/theme';

const LineageAcademyBlock = () => (
  <Container>
    <Content>
      <Heading>Even More Learning</Heading>
      <Body>
        Read more coffee stories, roasting masterclass tips, and coffee science
        posted freely and sporadically on Medium and Instagram.
      </Body>
    </Content>
    <Actions>
      <Waves width={`${3 * grid}px`} />
      <Button color="blue" href="https://medium.com/lineage-academy/" rel="noopener" target="_blank">Lineage Academy on Medium</Button>
      <Button color="blue" href="https://instagram.com/lineageacademy" rel="noopener" target="_blank">Lineage Academy on Instagram</Button>
    </Actions>
  </Container>
);

/**
 * Styles
 */

const Container = glamorous.div({
  backgroundColor: `rgb(${color.white})`,
  backgroundImage: `linear-gradient(35deg, rgba(${color.white}, 1) 25%, rgba(${color.white}, 0)), url('https://cdn-images-1.medium.com/max/2000/1*3FfxQ5V16HhHLWojCQI__A.jpeg')`,
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  paddingTop: 3 * grid,
  paddingBottom: 2 * grid,
});

const Content = glamorous.div({
  maxWidth: '35em',
  paddingLeft: grid,

  '@media (min-width: 600px)': {
    paddingLeft: 2 * grid,
    width: '50%',
  },
});

const Heading = glamorous.h3({
  fontSize: font.up4,
  marginBottom: 0,
  marginTop: 0,
  textTransform: 'uppercase',
});

const Body = glamorous.p({
  fontSize: font.up1,
  lineHeight: 1.8,
  marginBottom: grid,
  marginTop: grid,
});

const Actions = glamorous.menu({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 2 * grid,
  paddingBottom: 0,
  paddingLeft: grid,
  paddingRight: grid,
  paddingTop: 0,
  position: 'relative',

  '& > * + *': {
    marginTop: 0.5 * grid,

    '@media (min-width: 600px)': {
      marginLeft: grid,
      marginTop: 0,
    },
  },

  '@media (min-width: 600px)': {
    flexDirection: 'row',
  },
});

export default LineageAcademyBlock;
