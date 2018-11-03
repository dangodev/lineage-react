import styled from 'react-emotion';

export const Grid = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  @media (min-width: 920px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Zero = styled.div`
  padding-bottom: 1rem;
  padding-top: 1rem;
  text-align: center;
`;
