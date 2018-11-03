import * as React from 'react';

import * as Styled from './styles';

const CoffeeData = ({ metafields }) => (
  <Styled.Metafields>
    <Styled.Heading>Deets</Styled.Heading>
    <Styled.Inner>
      {metafields.c_f.altitude && [
        <Styled.Key key="altitude">Elevation</Styled.Key>,
        <Styled.Value key={metafields.c_f.altitude}>{metafields.c_f.altitude}m</Styled.Value>,
      ]}
      {metafields.c_f.country && [
        <Styled.Key key="country">Origin</Styled.Key>,
        <Styled.Value key={metafields.c_f.country}>{metafields.c_f.country}</Styled.Value>,
      ]}
      {metafields.c_f.grower && [
        <Styled.Key key="farm">Farm</Styled.Key>,
        <Styled.Value key={metafields.c_f.grower}>{metafields.c_f.grower}</Styled.Value>,
      ]}
      {metafields.c_f.variety && [
        <Styled.Key key="variety">Variety</Styled.Key>,
        <Styled.Value key={metafields.c_f.variety}>{metafields.c_f.variety}</Styled.Value>,
      ]}
      {metafields.c_f.size && [
        <Styled.Key key="size">Size</Styled.Key>,
        <Styled.Value key={metafields.c_f.size}>{metafields.c_f.size}</Styled.Value>,
      ]}
      {metafields.c_f.process && [
        <Styled.Key key="process">Process</Styled.Key>,
        <Styled.Value key={metafields.c_f.processing_method}>
          {metafields.c_f.processing_method}
        </Styled.Value>,
      ]}
      {metafields.c_f.peak_flavor && [
        <Styled.Key key="freshness">Freshness Peak</Styled.Key>,
        <Styled.Value key={metafields.c_f.peak_flavor}>{metafields.c_f.peak_flavor}</Styled.Value>,
      ]}
      {metafields.c_f.additional_notes && [
        <Styled.Key key="additional_notes">Additional Notes</Styled.Key>,
        <Styled.Value full key={metafields.c_f.additional_notes}>
          {metafields.c_f.additional_notes}
        </Styled.Value>,
      ]}
    </Styled.Inner>
  </Styled.Metafields>
);

export default CoffeeData;
