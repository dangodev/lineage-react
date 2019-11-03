import React, { Fragment } from 'react';

import * as Styled from './styles';

const title: { [key: string]: string } = {
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

interface CoffeeDataProps {
  metafields: {
    c_f: { [key in keyof typeof title]: string };
  };
}

const stringify = (str: string) => str.replace(/_/g, ' ');

const userValue = (value: string, field: string) => {
  switch (field) {
    case 'additional_notes':
      return value.replace(/\n/g, '<br />');
    default:
      return value;
  }
};

const CoffeeData: React.FunctionComponent<CoffeeDataProps> = ({ metafields: { c_f } }) => (
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

export default CoffeeData;
