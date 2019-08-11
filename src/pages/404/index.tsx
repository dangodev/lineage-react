import React from 'react';
import * as Styled from './styles';

const FourOhFourPage: React.FunctionComponent = () => (
  <Styled.Container>
    <Styled.Heading>404</Styled.Heading>
    <Styled.Subheading>Page Not Found</Styled.Subheading>
    <Styled.Body>
      Try returning to the <a href="/">home page</a>.
    </Styled.Body>
  </Styled.Container>
);

export default FourOhFourPage;
