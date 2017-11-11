import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { font, grid } from '../lib/theme';

const PageHeader = props => (
  <Container
    backgroundColor={props.backgroundColor}
    backgroundImage={props.backgroundImage}
  >
    <Heading>{props.heading}</Heading>
    <Subheading>{props.subheading}</Subheading>
  </Container>
);

PageHeader.defaultProps = {
  backgroundColor: 'rgb(212, 224, 236)',
  backgroundImage: '',
  heading: '',
  subheading: '',
};

PageHeader.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

/**
 * Styles
 */

const Container = glamorous.div(
  {
    alignItems: 'center',
    backgroundColor: '',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '62.5vh',
    paddingBottom: 2 * grid,
    paddingLeft: grid,
    paddingRight: grid,
    paddingTop: 2 * grid,
  },
  props => ({
    backgroundColor: props.backgroundColor,
    backgroundImage: `url(${props.backgroundImage})`,
  })
);

const Heading = glamorous.h1({
  fontFamily: font.kaufmann,
  fontSize: font.up8,
  marginBottom: 0,
  marginTop: 0,
});

const Subheading = glamorous.h3({
  fontSize: font.up1,
  fontWeight: 500,
  marginBottom: 2 * grid,
  marginTop: 0,
  textAlign: 'center',
  textTransform: 'uppercase',
});

export default PageHeader;
