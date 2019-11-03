import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { color, font } from '../../lib/theme';

export const Actions = styled.menu`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  margin-top: 1rem;
  padding: 0;
`;

export const Container = styled.div`
  border-radius: 1rem;
  box-shadow: 0 0 0 1px rgba(${color.gray}, 0.25);
  color: rgb(${color.gray});
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
  padding-bottom: 4rem;
  padding-top: 4rem;
  text-align: center;
  text-transform: uppercase;
`;

export const Heading = styled.h4`
  font-size: ${font.up2};
  margin-bottom: 0;
  margin-top: 0;
`;

export const Subheading = styled.small`
  display: block;
  font-size: ${font.down2};
  font-weight: 400;
  margin-top: 0.5rem;
  text-transform: none;
`;

export const SuggestedLink = styled(Link)`
  color: rgb(${color.blue});
  font-size: ${font.down1};
  font-weight: 700;
  margin-left: 0.5em;
  margin-right: 0.5em;
  text-decoration: none;
  text-transform: uppercase;
`;
