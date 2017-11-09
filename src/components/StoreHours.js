import React from 'react';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';

const locations = [
  {
    name: 'East End Market',
    opening: 20130901,
    hours: [    // EST
      [10, 18], // Open (military), Close (military)
      [8, 19],
      [8, 19],
      [8, 19],
      [8, 19],
      [8, 19],
      [8, 19],
    ],
  },
  {
    name: 'Mills/50',
    opening: 20180001,
    hours: [
      [10, 18],
      [8, 19],
      [8, 19],
      [8, 19],
      [8, 19],
      [8, 19],
      [8, 19],
    ],
  },
];

const format = (hours) => {
  if (hours === 12) {
    return `${hours}p`;
  } else if (hours >= 13) {
    return `${hours - 12}p`;
  }
  return `${hours}a`;
};

const today = new Date();
const offsetMin = today.getTimezoneOffset();
const offsetHours = offsetMin / 60;
let day = Math.floor(today.getUTCDay() - offsetHours / 24);
day = day < 0 ? 6 : (day >= 7 ? 0 : day);

const isOpen = (location) => {
  let hours = today.getUTCHours() - offsetHours; // can be > 24; makes late-night closing calculations and timezones simpler
  hours = hours < 0 ? hours + 24 : hours;
  let minutes = today.getUTCMinutes();
  minutes = minutes < 0 ? minutes + 60 : minutes;

  // Check if location opened
  const month = today.getUTCMonth() < 9 ? `0${today.getUTCMonth() + 1}` : today.getUTCMonth() + 1;
  const date = today.getUTCDate() < 10 ? `0${today.getUTCDate()}` : today.getUTCDate();
  if (parseInt(`${today.getUTCFullYear()}${month}${date}`, 10) < location.opening) {
    return 'Opening Soon';
  }
  // Return closing soon if within 30 min
  let open = location.hours[day][0];
  open = open < 0 ? open + 24 : open;
  let close = location.hours[day][1];
  close = close < 0 ? close + 24 : close;

  if ((hours + minutes / 60) >= (close - 0.5) && hours < close) {
    return 'Closing Soon';
  } else if (hours >= open && hours < close) {
    return 'Open';
  }
  return 'Closed';
};

const StoreHours = () => (
  <Container>
    <Heading>Locations</Heading>
    <Grid>
      {locations.map(location => {
        const status = isOpen(location);
        return (
          <Location key={location.name}>
            <LocationName>{location.name}</LocationName>
            <Status status={status}>{status}</Status>
            {status !== 'Opening Soon' &&
              <div>
                <Hours isToday={day > 1 && day < 6}>
                  <Days>M–F</Days>
                  <Range>{format(location.hours[1][0])} – {format(location.hours[1][1])}</Range>
                </Hours>
                <Hours isToday={day === 6}>
                  <Days>Sat</Days>
                  <Range>{format(location.hours[6][0])} – {format(location.hours[6][1])}</Range>
                </Hours>
                <Hours isToday={day === 0}>
                  <Days>Sun</Days>
                  <Range>{format(location.hours[0][0])} – {format(location.hours[0][1])}</Range>
                </Hours>
              </div>
            }
          </Location>
        );
      })}
    </Grid>
  </Container>
);

const Container = glamorous.div({
  paddingBottom: 2 * grid,
  paddingTop: grid,
});

const Heading = glamorous.h1({
  fontFamily: font.kaufmann,
  fontSize: font.up4,
  textAlign: 'center',
});

const Grid = glamorous.div({
  display: 'block',

  '@media (min-width: 600px)': {
    display: 'grid',
    gridColumnGap: grid,
    gridTemplateColumns: 'repeat(12, 1fr)',
  },
});

const Location = glamorous.div({
  gridColumn: '8 / span 2',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: grid,
  maxWidth: '20em',
  width: `calc(100vw - ${2 * grid}px)`,

  '@media (min-width: 600px)': {
    marginLeft: 0,
    marginRight: 0,
  },

  '&:nth-of-type(odd)': {
    gridColumn: '4 / span 2',
  },
});

const LocationName = glamorous.h2({
  fontSize: font.up1,
  fontWeight: 700,
  lineHeight: 1,
  margin: 0,
  textTransform: 'uppercase',
});

const Status = glamorous.h3(
  {
    fontFamily: font.kaufmann,
    fontSize: font.up3,
    lineHeight: 1,
    marginBottom: 0,
    marginTop: 0.25 * grid,
  },
  props => ({
    color: props.status === 'Open' ? `rgb(${color.blue})` : (props.status === 'Closing Soon' ? `rgb(${color.red})` : `rgb(${color.gray})`),
  })
);

const Hours = glamorous.dl(
  {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    fontWeight: 500,
    lineHeight: 1,
  },
  props => ({
    color: props.isToday ? `rgb(${color.black})` : `rgb(${color.gray})`,
  })
);

const Days = glamorous.dt({
  display: 'block',
  margin: 0,
  width: '50%',
});

const Range = glamorous.dd({
  display: 'block',
  margin: 0,
  textAlign: 'right',
  width: '50%',
});

export default StoreHours;
