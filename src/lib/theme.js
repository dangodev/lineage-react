/* Color */

const color = {
  black: '35, 31, 32',
  blue: '139, 210, 215',
  blueT: '209, 239, 242',
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

const font = {
  din: '"FF DIN", "DIN", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  kaufmann: '"Kaufmann", cursive',
  blokk: '"BLOKK", cursive',

  up5: '2em',
  up4: '1.7511em',
  up3: '1.5157em',
  up2: '1.3195em',
  up1: '1.1487em',
  down1: '0.8706em',
  down2: '0.7579em',
  down3: '0.6599em',
  down4: '0.5745em',
  down5: '0.5em',
};

/* Grid */

const grid = 36;

/* Layers */

const layer = {
  base: 10,
  modal: 20,
  cart: 30,
};

/* Transitions */

const transition = {
  fastOutSlowIn: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linearOutSlowIn: 'cubic-bezier(0, 0, 0.2, 1)',
  fastOutLinearIn: 'cubic-bezier(0.4, 0, 1, 1)',
};
transition.default = transition.fastOutSlowIn;
transition.sharp = transition.fastOutLinearIn;
transition.acceleration = transition.fastOutLinearIn;
transition.deceleration = transition.linearOutSlowIn;
transition.standard = transition.default;

export { color, font, grid, layer, transition };
