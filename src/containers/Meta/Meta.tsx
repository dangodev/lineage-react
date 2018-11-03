import * as React from 'react';
import { Helmet } from 'react-helmet';

const Meta = (props: { title: string }) => {
  const { title } = props;

  return (
    <Helmet>
      <title>{title || 'Lineage Coffee Roasting · Orlando, FL'}</title>
    </Helmet>
  );
};

export default Meta;
