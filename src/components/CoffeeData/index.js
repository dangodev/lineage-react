import React from 'react';
import PropTypes from 'prop-types';

import Styled from './styles';

const CoffeeData = props => (
  <Styled.Metafields>
    <Styled.Heading>Deets</Styled.Heading>
    <Styled.Inner>
      {props.metafields.elevation && [
        <Styled.Key key="elevation">Elevation</Styled.Key>,
        <Styled.Value key={props.metafields.elevation}>{props.metafields.elevation}</Styled.Value>,
      ]}
      {props.metafields.country && [
        <Styled.Key key="country">Origin</Styled.Key>,
        <Styled.Value key={props.metafields.country}>{props.metafields.country}</Styled.Value>,
      ]}
      {props.metafields.grower && [
        <Styled.Key key="farm">Farm</Styled.Key>,
        <Styled.Value key={props.metafields.grower}>{props.metafields.grower}</Styled.Value>,
      ]}
      {props.metafields.variety && [
        <Styled.Key key="variety">Variety</Styled.Key>,
        <Styled.Value key={props.metafields.variety}>{props.metafields.variety}</Styled.Value>,
      ]}
      {props.metafields.size && [
        <Styled.Key key="size">Size</Styled.Key>,
        <Styled.Value key={props.metafields.size}>{props.metafields.size}</Styled.Value>,
      ]}
      {props.metafields.process && [
        <Styled.Key key="process">Process</Styled.Key>,
        <Styled.Value key={props.metafields.processing_method}>{props.metafields.processing_method}</Styled.Value>,
      ]}
      {props.metafields.peak_flavor && [
        <Styled.Key key="freshness">Freshness Peak</Styled.Key>,
        <Styled.Value key={props.metafields.peak_flavor}>{props.metafields.peak_flavor}</Styled.Value>,
      ]}
      {props.metafields.additional_notes && [
        <Styled.Key key="additional_notes">Additional Notes</Styled.Key>,
        <Styled.Value full key={props.metafields.additional_notes}>{props.metafields.additional_notes}</Styled.Value>,
      ]}
    </Styled.Inner>
  </Styled.Metafields>
);

CoffeeData.propTypes = {
  metafields: PropTypes.object.isRequired,
};


export default CoffeeData;
