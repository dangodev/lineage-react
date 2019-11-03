/* Color */

export const color = {
  black: '35, 31, 32',
  blue: '139, 210, 215',
  blueT: '209, 239, 242',
  cadet: '201, 219, 231',
  gray: '173, 168, 164',
  grayTT: '221, 215, 209',
  green: '58, 123, 115',
  offwhite: '255, 248, 242',
  pink: '250, 196, 170',
  red: '238, 72, 46',
  white: '254, 254, 254',
  yellow: '241, 208, 18',
};

/* Type */

export const font = {
  din:
    '"FF DIN", "DIN", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  kaufmann: '"Kaufmann", cursive',
  blokk: '"BLOKK", cursive',

  up10: '4em',
  up9: '3.482202em',
  up8: '3.013143em',
  up7: '2.639016em',
  up6: '2.297397em',
  up5: '2em',
  up4: '1.751101em',
  up3: '1.515717em',
  up2: '1.319508em',
  up1: '1.148698em',
  down1: '0.8706em',
  down2: '0.7579em',
  down3: '0.6599em',
  down4: '0.5745em',
  down5: '0.5em',
  down6: '0.435275em',
  down7: '0.378929em',
  down8: '0.329877em',
  down9: '0.287175em',
  down10: '0.25em',
};

/* Layers */

export const layer = {
  base: 10,
  nav: 20,
  modal: 30,
  loading: 40,
  cart: 50,
};

/* Transitions */

export const transition = {
  fastOutSlowIn: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linearOutSlowIn: 'cubic-bezier(0, 0, 0.2, 1)',
  fastOutLinearIn: 'cubic-bezier(0.4, 0, 1, 1)',
};
transition.default = transition.fastOutSlowIn;
transition.sharp = transition.fastOutLinearIn;
transition.acceleration = transition.fastOutLinearIn;
transition.deceleration = transition.linearOutSlowIn;
transition.standard = transition.default;
