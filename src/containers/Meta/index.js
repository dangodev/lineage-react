import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Meta = props => (
  <Helmet>
    <title>{props.title}</title>
  </Helmet>
);

Meta.defaultPropTypes = {
  title: 'Lineage Coffee Roasting · Orlando, FL',
};

Meta.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Meta;
