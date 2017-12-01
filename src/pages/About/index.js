import React from 'react';

import PageHeading from 'components/PageHeading';
import TimelineEvent from 'components/TimelineEvent';
import StoreHours from 'components/StoreHours';

import Styled from './styles';

const timeline = [
  {
    month: 'Jan',
    year: 2012,
    event: 'Jarrett and Justine decide to start a coffee business, and pick the name “Lineage”',
  },
  {
    month: 'May',
    year: 2012,
    event: 'Bought first perforated drum roaster and retrofitted a grill to roast with an ice cream motor (the coffee was every bit as bad as you’d expect)',
  },
  {
    month: 'Oct',
    year: 2012,
    event: 'Decided to buy our first real 3kg roaster with some help from family',
  },
  {
    inBetween: true,
    event: 'Destroyed lots of coffee while learning',
  },
  {
    month: 'Apr',
    year: 2013,
    event: 'Lineage’s Audubon Park Farmer’s Market debut',
  },
  {
    inBetween: true,
    event: 'Lots of travel and studying from other roasters',
  },
  {
    month: 'Sep',
    year: 2013,
    event: 'Ryan joined the Lineage Family',
  },
  {
    month: 'Oct',
    year: 2013,
    event: 'Lineage’s Coffee Bar opened at East End Market',
  },
  {
    month: 'Dec',
    year: 2013,
    event: 'Landed our first big wholesale customer and outgrew our 3kg roaster',
  },
  {
    month: 'Jan',
    year: 2015,
    event: 'First sourcing trip to Colombia',
  },
  {
    month: 'Jul',
    year: 2015,
    event: 'Began to open up direct trade relationships in Guatemala, Colombia, Kenya, and Brazil',
  },
  {
    inBetween: true,
    event: 'Built grower relationships throughout Africa and Central America',
  },
  {
    month: 'Mar',
    year: 2017,
    event: 'Began work to open our second location in Mills/50',
  },
  {
    month: 'Dec',
    year: 2017,
    event: 'Opened our second location in Downtown Orlando!',
  },
];

const About = () => (
  <div>
    <PageHeading backgroundImage="https://cdn.shopify.com/s/files/1/0746/4367/files/Cafe_Sneak-9.jpg?1220134621319934851" />
    {/* <Styled.SectionHeading>Awards / Recognition</Styled.SectionHeading>
    <Styled.AwardList>
      <Styled.Award href="http://www.goodfoodawards.org/winners/" rel="noopener" target="_blank">
        <img src="https://cdn.shopify.com/s/files/1/0746/4367/files/2017-good-food-winner.png?5579671480418304637" alt="Good Food™ Award Winner 2017: Coffee" title="Good Food™ Award Winner 2017: Coffee" />
      </Styled.Award>
    </Styled.AwardList> */}
    <Styled.SectionHeading>About</Styled.SectionHeading>
    <Styled.Content>
      <p>
        Lineage Coffee Roasting is a craft coffee roaster from Orlando, FL
        set on sharing our love of coffee with our community. We’re
        passionate about uncovering the nuances and complexities of each
        coffee we source, roast, and serve, and telling the stories behind them.
      </p>
    </Styled.Content>
    <Styled.SectionHeading>Lineage Timeline</Styled.SectionHeading>
    <Styled.Grid>
      {timeline.map(event => (
        <TimelineEvent
          key={`${event.year}${event.month}`}
          month={event.month}
          inBetween={event.inBetween ? true : undefined}
          year={event.year}
          event={event.event}
        />
      ))}
    </Styled.Grid>
    <StoreHours />
  </div>
);

export default About;
