import glamorous from 'glamorous';

import { font, grid } from 'lib/theme';

export default {
  Container: glamorous.div(
    {
      alignItems: 'center',
      backgroundColor: '',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxHeight: '56.25vw',
      minHeight: '37.5vh',
      paddingBottom: 2 * grid,
      paddingLeft: grid,
      paddingRight: grid,
      paddingTop: 2 * grid,

      '@media (min-width: 600px)': {
        minHeight: '62.5vh',
      },
    },
    props => ({
      backgroundColor: props.backgroundColor,
      backgroundImage: `url(${props.backgroundImage})`,
      backgroundPosition: props.backgroundPosition,
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
