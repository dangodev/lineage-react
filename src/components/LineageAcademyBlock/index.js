import React from 'react';

import Button from 'components/Button';
import Waves from 'components/Waves';

import { grid } from 'lib/theme';

import Styled from './styles';

const LineageAcademyBlock = () => (
  <Styled.Container>
    <Styled.Content>
      <Styled.Heading>Even More Learning</Styled.Heading>
      <Styled.Body>
        Read more coffee stories, roasting masterclass tips, and coffee science
        posted freely and sporadically on Medium and Instagram.
      </Styled.Body>
    </Styled.Content>
    <Styled.Actions>
      <Waves width={`${3 * grid}px`} />
      <Button color="blue" href="https://medium.com/lineage-academy/" rel="noopener noreferrer" target="_blank">Lineage Academy on Medium</Button>
      <Button color="blue" href="https://instagram.com/lineageacademy" rel="noopener noreferrer" target="_blank">Lineage Academy on Instagram</Button>
    </Styled.Actions>
  </Styled.Container>
);

export default LineageAcademyBlock;
