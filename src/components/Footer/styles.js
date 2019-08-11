import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { color, font } from 'lib/theme';

export const Container = styled.div`
  background-color: rgb(${color.white});
  padding-bottom: 4rem;
  padding-top: 4rem;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 780px) {
    flex-direction: row;
    padding-left: 2rem;
    padding-right: 2rem;
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
  margin-left: 0.5rem;
  margin-right: 0.5rem;
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
    padding-left: 8rem;
  }
`;

export const SocialNav = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: 0;
  margin-top: 2rem;

  @media (min-width: 780px) {
    justify-content: flex-end;
    margin-left: auto;
    margin-top: 0;
    width: 8rem;
  }

  & a {
    color: rgb(${color.black});
    display: block;
    transition: color 200ms;

    &:hover {
      color: rgb(${color.blue});
    }

    & + a {
      margin-left: 0.5rem;
    }
  }

  & svg {
    fill: currentColor;
    height: 1.25rem;
    width: 1.25rem;
  }
`;

export const Logo = styled.img`
  display: block;
  height: 4rem;
  margin-top: 2rem;
  width: auto;
`;

export const Contact = styled.a`
  color: rgb(${color.blue});
  display: block;
  font-size: ${font.down2};
  margin-top: 1rem;
`;

export const Copyright = styled.aside`
  display: block;
  font-size: ${font.down3};
  margin-top: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;

  & a {
    color: rgb(${color.blue});
  }
`;
