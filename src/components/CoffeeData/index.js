import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles';

const CoffeeData = props => (
  <Styled.Metafields>
    <Styled.Heading>Deets</Styled.Heading>
    <Styled.Inner>
      {props.metafields.c_f.altitude && [
        <Styled.Key key="altitude">Elevation</Styled.Key>,
        <Styled.Value key={props.metafields.c_f.altitude}>{props.metafields.c_f.altitude}m</Styled.Value>,
      ]}
      {props.metafields.c_f.country && [
        <Styled.Key key="country">Origin</Styled.Key>,
        <Styled.Value key={props.metafields.c_f.country}>{props.metafields.c_f.country}</Styled.Value>,
      ]}
      {props.metafields.c_f.grower && [
        <Styled.Key key="farm">Farm</Styled.Key>,
        <Styled.Value key={props.metafields.c_f.grower}>{props.metafields.c_f.grower}</Styled.Value>,
      ]}
      {props.metafields.c_f.variety && [
        <Styled.Key key="variety">Variety</Styled.Key>,
        <Styled.Value key={props.metafields.c_f.variety}>{props.metafields.c_f.variety}</Styled.Value>,
      ]}
      {props.metafields.c_f.size && [
        <Styled.Key key="size">Size</Styled.Key>,
        <Styled.Value key={props.metafields.c_f.size}>{props.metafields.c_f.size}</Styled.Value>,
      ]}
      {props.metafields.c_f.process && [
        <Styled.Key key="process">Process</Styled.Key>,
        <Styled.Value key={props.metafields.c_f.processing_method}>{props.metafields.c_f.processing_method}</Styled.Value>,
      ]}
      {props.metafields.c_f.peak_flavor && [
        <Styled.Key key="freshness">Freshness Peak</Styled.Key>,
        <Styled.Value key={props.metafields.c_f.peak_flavor}>{props.metafields.c_f.peak_flavor}</Styled.Value>,
      ]}
      {props.metafields.c_f.additional_notes && [
        <Styled.Key key="additional_notes">Additional Notes</Styled.Key>,
        <Styled.Value full key={props.metafields.c_f.additional_notes}>{props.metafields.c_f.additional_notes}</Styled.Value>,
      ]}
    </Styled.Inner>
  </Styled.Metafields>
);

CoffeeData.propTypes = {
  metafields: PropTypes.object.isRequired,
};


export default CoffeeData;
