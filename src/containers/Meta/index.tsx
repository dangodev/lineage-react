import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaProps {
  title?: string;
}

const Meta: React.FunctionComponent<MetaProps> = ({
  title = 'Lineage Coffee Roasting · Orlando, FL',
}) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
);

export default Meta;
