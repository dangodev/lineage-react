import React from 'react';

import * as Styled from './styles';

interface Location {
  name: string;
  address: string;
  opening: string;
  militaryHours: [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
    [number, number],
    [number, number],
    [number, number]
  ];
  tz: number;
}

const locations: Location[] = [
  {
    name: 'East End Market',
    address: '3201 Corrine Dr',
    opening: '2013-09-01',
    militaryHours: [
      [8, 18],
      [8, 19],
      [8, 19],
      [8, 19],
      [8, 19],
      [8, 19],
      [8, 19],
    ],
    tz: 5, // EST
  },
  {
    name: 'Mills/50',
    address: '1011 E Colonial Dr',
    opening: '2017-12-02',
    militaryHours: [
      [7, 19],
      [7, 19],
      [7, 19],
      [7, 19],
      [7, 19],
      [7, 19],
      [7, 19],
    ],
    tz: 5, // EST
  },
];

const format = (hours: number) => {
  if (hours === 12) {
    return `${hours}p`;
  }
  return hours >= 13 ? `${hours - 12}p` : `${hours}a`;
};

const StoreHours: React.FunctionComponent = () => {
  function getDay(tz: number) {
    let day = new Date().getUTCDay();
    // if it’s just past midnight UTC, stay previous day UTC
    if (new Date().getUTCHours() < tz) {
      day -= 1;
    }
    // if we subtracted from Sunday, it’s Saturday
    if (day < 0) {
      day = 6;
    }
    return day;
  }

  function isOpen({ opening, militaryHours, tz }: Location) {
    // location hasn’t opened
    const currentDate = new Date();
    if (currentDate < new Date(opening)) {
      return 'Opening Soon';
    }

    let currentHour = new Date().getUTCHours() - tz;
    if (currentHour < 0) {
      currentHour += 24;
    }
    const [open, close] = militaryHours[getDay(tz)];

    // return closing soon if within last hour
    if (close - currentHour === 1) {
      return 'Closing Soon';
    }
    if (currentHour >= open && currentHour < close) {
      return 'Open';
    }
    return 'Closed';
  }

  return (
    <Styled.Container>
      <Styled.Heading>Locations</Styled.Heading>
      <Styled.Grid>
        {locations.map(location => {
          const status = isOpen(location);
          const day = getDay(location.tz);
          return (
            <Styled.Location key={location.name}>
              <Styled.LocationName>{location.name}</Styled.LocationName>
              <Styled.LocationAddress
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  location.address
                )},+Orlando+FL`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {location.address}
              </Styled.LocationAddress>
              <Styled.Status status={status}>{status}</Styled.Status>
              {status !== 'Opening Soon' && (
                <div>
                  <Styled.Hours isToday={day >= 1 && day <= 5}>
                    <Styled.Days>M–F</Styled.Days>
                    <Styled.Range>
                      {format(location.militaryHours[1][0])} –{' '}
                      {format(location.militaryHours[1][1])}
                    </Styled.Range>
                  </Styled.Hours>
                  <Styled.Hours isToday={day === 6}>
                    <Styled.Days>Sat</Styled.Days>
                    <Styled.Range>
                      {format(location.militaryHours[6][0])} –{' '}
                      {format(location.militaryHours[6][1])}
                    </Styled.Range>
                  </Styled.Hours>
                  <Styled.Hours isToday={day === 0}>
                    <Styled.Days>Sun</Styled.Days>
                    <Styled.Range>
                      {format(location.militaryHours[0][0])} –{' '}
                      {format(location.militaryHours[0][1])}
                    </Styled.Range>
                  </Styled.Hours>
                </div>
              )}
            </Styled.Location>
          );
        })}
      </Styled.Grid>
    </Styled.Container>
  );
};

export default StoreHours;
