import glamorous from 'glamorous';

import { color, font, grid } from 'lib/theme';

export default {
  Actions: glamorous.menu({
    display: 'flex',
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 2 * grid,
    paddingBottom: 0,
    paddingLeft: 2 * grid,
    paddingRight: 0,
    paddingTop: 0,
    position: 'relative',
  }),

  Body: glamorous.p({
    fontSize: font.up1,
    lineHeight: 1.8,
    marginBottom: grid,
    marginTop: grid,
  }),

  Container: glamorous.div({
    backgroundColor: `rgb(${color.blue})`,
    paddingTop: 3 * grid,
    paddingBottom: 2 * grid,
  }),

  Content: glamorous.div({
    maxWidth: '35em',
    paddingLeft: 2 * grid,
    width: '50%',
  }),

  Heading: glamorous.h3({
    fontSize: font.up4,
    marginBottom: 0,
    marginTop: 0,
    textTransform: 'uppercase',
  }),
};
