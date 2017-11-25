import glamorous from 'glamorous';
import { Link } from 'react-router-dom';

import { color, font, grid } from 'lib/theme';

export default {
  Actions: glamorous.menu({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 0.5 * grid,
    padding: 0,
  }),

  Container: glamorous.div({
    borderRadius: 0.5 * grid,
    boxShadow: `0 0 0 1px rgba(${color.gray}, 0.25)`,
    color: `rgb(${color.gray})`,
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: grid,
    marginLeft: grid,
    marginRight: grid,
    paddingBottom: 2 * grid,
    paddingTop: 2 * grid,
    textAlign: 'center',
    textTransform: 'uppercase',
  }),

  Heading: glamorous.h4({
    fontSize: font.up2,
    marginBottom: 0,
    marginTop: 0,
  }),

  Subheading: glamorous.small({
    display: 'block',
    fontSize: font.down2,
    fontWeight: 400,
    marginTop: 0.25 * grid,
    textTransform: 'none',
  }),

  SuggestedLink: glamorous(Link)({
    color: `rgb(${color.blue})`,
    fontSize: font.down1,
    fontWeight: 700,
    marginLeft: '0.5em',
    marginRight: '0.5em',
    textDecoration: 'none',
    textTransform: 'uppercase',
  }),
};
