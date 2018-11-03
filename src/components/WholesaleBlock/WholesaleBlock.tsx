import * as React from 'react';
import Button from 'components/Button';
import Waves from 'components/Waves';
import * as Styled from './styles';

const WholesaleBlock = () => (
  <Styled.Container>
    <Styled.Content>
      <Styled.Heading>Wholesale</Styled.Heading>
      <Styled.Body>
        Every month we ship hundreds of pounds of our just-roasted gourmet coffee to offices and
        restaurants around the state. Ready to make Lineage part of your workday?
      </Styled.Body>
    </Styled.Content>
    <Styled.Actions>
      <Waves width="3rem" />
      <Button color="white" to="/pages/wholesale">
        Learn More
      </Button>
    </Styled.Actions>
  </Styled.Container>
);

export default WholesaleBlock;
