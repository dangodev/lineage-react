import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles';

const title = {
  additional_notes: 'Additional Notes',
  annual_production: 'Annual Production',
  country: 'Country',
  elevation: 'Elevation',
  farm: 'Farm',
  green_coffee_moisture: 'Green Coffee Moisture',
  grower: 'Grower',
  harvest: 'Harvest',
  mill: 'Mill Owner',
  peak_flavor: 'Peak Flavor',
  processing_method: 'Processing Method',
  region: 'Region',
  seller: 'Industry Seller',
  size: 'Size',
  variety: 'Variety',
  warehouse: 'Warehouse',
  water_activity: 'Water Activity',
};

const stringify = title => title.replace(/_/g, ' ');

const userValue = (value, field) => {
  switch (field) {
    case 'additional_notes':
      return value.replace(/\n/g, '<br />');
    default:
      return value;
  }
};

const CoffeeData = ({ metafields: { c_f } }) => (
  <Styled.Metafields>
    <Styled.Heading>Deets</Styled.Heading>
    <Styled.Inner>
      {Object.entries(c_f).map(
        ([field, value]) =>
          field !== 'color' && (
            <Fragment key={field}>
              <Styled.Key>{title[field] || stringify(field)}</Styled.Key>
              <Styled.Value dangerouslySetInnerHTML={{ __html: userValue(value, field) }} />
            </Fragment>
          )
      )}
    </Styled.Inner>
  </Styled.Metafields>
);

CoffeeData.propTypes = {
  metafields: PropTypes.shape({
    c_f: PropTypes.shape(),
  }).isRequired,
};

export default CoffeeData;
