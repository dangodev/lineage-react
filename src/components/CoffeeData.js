import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';

const CoffeeData = props => (
  <Metafields>
    <Inner>
      {props.metafields.elevation && [
        <Key key="elevation">Elevation</Key>, <Value key={props.metafields.elevation}>{props.metafields.elevation}</Value>,
      ]}
      {props.metafields.country && [
        <Key key="country">Origin</Key>, <Value key={props.metafields.country}>{props.metafields.country}</Value>,
      ]}
      {props.metafields.grower && [
        <Key key="farm">Farm</Key>, <Value key={props.metafields.grower}>{props.metafields.grower}</Value>,
      ]}
      {props.metafields.variety && [
        <Key key="variety">Variety</Key>, <Value key={props.metafields.variety}>{props.metafields.variety}</Value>,
      ]}
      {props.metafields.size && [
        <Key key="size">Size</Key>, <Value key={props.metafields.size}>{props.metafields.size}</Value>,
      ]}
      {props.metafields.process && [
        <Key key="process">Process</Key>, <Value key={props.metafields.processing_method}>{props.metafields.processing_method}</Value>,
      ]}
      {props.metafields.peak_flavor && [
        <Key key="freshness">Freshness Peak</Key>, <Value key={props.metafields.peak_flavor}>{props.metafields.peak_flavor}</Value>,
      ]}
    </Inner>
  </Metafields>
);

CoffeeData.propTypes = {
  metafields: PropTypes.object.isRequired,
};

const Metafields = glamorous.div({
  backgroundColor: `rgb(${color.offwhite})`,
  flex: 2,
  fontSize: font.down2,
  margin: 0,
  padding: 0.75 * grid,
});

const Inner = glamorous.dl({
  display: 'flex',
  flexWrap: 'wrap',
  lineHeight: 1,
  margin: 0,
  paddingTop: 0,

  '@media (min-width: 600px)': {
    paddingTop: 0.5 * grid,
  },
});

const Key = glamorous.dt({
  fontWeight: 500,
  margin: 0,
  width: '50%',

  '& ~ dt': {
    paddingTop: 0.5 * grid,
  },
});

const Value = glamorous.dd({
  margin: 0,
  textAlign: 'right',
  width: '50%',

  '& ~ dd': {
    paddingTop: 0.5 * grid,
  },
});

export default CoffeeData;
