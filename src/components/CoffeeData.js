import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';

const CoffeeData = props => (
  <Metafields>
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
  </Metafields>
);

CoffeeData.propTypes = {
  metafields: PropTypes.object.isRequired,
};

const Metafields = glamorous.dl({
  alignItems: 'flex-start',
  backgroundColor: `rgb(${color.offwhite})`,
  display: 'flex',
  flex: 2,
  flexWrap: 'wrap',
  fontSize: font.down2,
  justifyContent: 'space-between',
  margin: 0,
  padding: grid,
});

const Key = glamorous.dt({
  fontWeight: 500,
  margin: 0,
  paddingTop: 0.25 * grid,
  width: '50%',
});

const Value = glamorous.dd({
  margin: 0,
  paddingTop: 0.25 * grid,
  textAlign: 'right',
  width: '50%',
});

export default CoffeeData;
