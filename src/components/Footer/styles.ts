import styled from 'react-emotion';
import { Link } from '@reach/router';
import { color, font } from 'lib/theme';

export const Container = styled.div`
  background-color: rgb(${color.white});
  padding-bottom: 2rem;
  padding-top: 2rem;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  @media (min-width: 780px) {
    flex-direction: row;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export const Colophon = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const StyledLink = styled(Link)`
  color: rgb(${color.black});
  display: block;
  font-family: ${font.din};
  font-size: ${font.down1};
  font-weight: 500;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 200ms;

  &:hover {
    color: rgb(${color.blue});
  }
`;

export const MainNav = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  line-height: 2;
  margin-left: 0;
  padding: 0;

  @media (min-width: 780px) {
    line-height: 1;
    margin-left: auto;
    padding-left: 4rem;
  }
`;

export const SocialNav = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: 0;
  margin-top: 1rem;

  @media (min-width: 780px) {
    justify-content: flex-end;
    margin-left: auto;
    margin-top: 0;
    width: 4rem;
  }

  & a {
    color: rgb(${color.black});
    display: block;
    transition: color 200ms;

    &:hover {
      color: rgb(${color.blue});
    }

    & + a {
      margin-left: 0.25rem;
    }
  }

  & svg {
    fill: currentColor;
    height: 0.625rem;
    width: 0.625rem;
  }
`;

export const Logo = styled.img`
  display: block;
  height: 2rem;
  margin-top: 1rem;
  width: auto;
`;

export const Contact = styled.a`
  color: rgb(${color.blue});
  display: block;
  font-size: ${font.down2};
  margin-top: 0.5rem;
`;

export const Copyright = styled.aside`
  display: block;
  font-size: ${font.down3};
  margin-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;

  & a {
    color: rgb(${color.blue});
  }
`;
