import styled from '@emotion/styled';

export const Grid = styled.div`
  display: grid;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;

  @media (min-width: 920px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Zero = styled.div`
  padding-bottom: 2rem;
  padding-top: 2rem;
  text-align: center;
`;
