import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { grid } from '../lib/theme';

const Page = props => <Container>{props.children}</Container>;

Page.propTypes = {
  children: PropTypes.node,
};

/**
 * Style
 */

const Container = glamorous.div({
  paddingLeft: 2 * grid,
  paddingRight: 2 * grid,
});

export default Page;
