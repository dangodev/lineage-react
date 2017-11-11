import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { color, font, grid, transition } from '../lib/theme';

const BrewGuide = props => (
  <Container href={props.link} rel="noopener" target="_blank">
    <Thumb>
      <img src={props.image} alt={props.title} />
    </Thumb>
    <Content>
      <Heading>{props.title}</Heading>
      <Description>{props.description}</Description>
      <Time>{props.time}</Time>
      <LinkText>View</LinkText>
    </Content>
  </Container>
);

BrewGuide.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

/**
 * Styles
 */

const Container = glamorous.a({
  borderRadius: 0.25 * grid,
  boxShadow: `${0.25 * grid}px ${0.25 * grid}px ${0.375 * grid}px rgba(${color.black}, 0.1)`,
  display: 'flex',
  flexDirection: 'column',
  textDecoration: 'none',
  transition: `box-shadow 300ms, transform 300ms ${transition.deceleration}`,

  ':hover': {
    transform: `translate(-${0.25 * grid}px, -${0.5 * grid}px)`,
    boxShadow: `${0.375 * grid}px ${0.375 * grid}px ${grid}px rgba(${color.black}, 0.05)`,

    '& div div': {
      color: `rgb(${color.blue})`,
    },
  },
});

const Thumb = glamorous.div({
  backgroundColor: 'rgb(203, 221, 233)',
  borderTopLeftRadius: 0.25 * grid,
  borderTopRightRadius: 0.25 * grid,
  height: 0,
  overflow: 'hidden',
  paddingTop: '37.5%',
  position: 'relative',
  width: '100%',

  '& img': {
    height: 'auto',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
  },
});

const Content = glamorous.div({
  backgroundColor: `rgb(${color.white})`,
  borderBottomLeftRadius: 0.25 * grid,
  borderBottomRightRadius: 0.25 * grid,
  color: `rgb(${color.black})`,
  flex: '0 1 100%',
  paddingBottom: grid,
  paddingLeft: grid,
  paddingRight: grid,
  paddingTop: 0.5 * grid,
  position: 'relative',
});

const Heading = glamorous.h3({
  fontFamily: font.kaufmann,
  fontSize: font.up4,
  marginBottom: 0,
  marginTop: 0,
  paddingRight: 2 * grid,
});

const Description = glamorous.p({
  fontSize: font.down1,
  marginBottom: 0,
  marginTop: 0,
  paddingRight: 2 * grid,
});

const Time = glamorous.small({
  alignItems: 'center',
  display: 'flex',
  fontSize: font.down2,
  fontWeight: 500,
  height: 0.875 * grid,
  position: 'absolute',
  right: grid,
  textTransform: 'uppercase',
  top: 0.75 * grid,
});

const LinkText = glamorous.div({
  bottom: grid,
  display: 'block',
  fontSize: '1em',
  fontWeight: 700,
  position: 'absolute',
  right: grid,
  textAlign: 'right',
  textTransform: 'uppercase',
  transition: 'color 200ms',
});

export default BrewGuide;
