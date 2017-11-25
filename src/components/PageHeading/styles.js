import glamorous from 'glamorous';

import { font, grid } from 'lib/theme';

export default {
  Container: glamorous.div(
    {
      alignItems: 'center',
      backgroundColor: '',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxHeight: '56.25vw',
      minHeight: '62.5vh',
      paddingBottom: 2 * grid,
      paddingLeft: grid,
      paddingRight: grid,
      paddingTop: 2 * grid,
    },
    props => ({
      backgroundColor: props.backgroundColor,
      backgroundImage: `url(${props.backgroundImage})`,
    }),
  ),

  Heading: glamorous.h1({
    fontFamily: font.kaufmann,
    fontSize: font.up8,
    marginBottom: 0,
    marginTop: 0,
  }),

  Subheading: glamorous.h3({
    fontSize: font.up1,
    fontWeight: 500,
    marginBottom: 2 * grid,
    marginTop: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
  }),
};
