import React from 'react';
import glamorous from 'glamorous';

import PageHeading from '../components/PageHeading';
import TimelineEvent from '../components/TimelineEvent';
import StoreHours from '../components/StoreHours';

import { font, grid } from '../lib/theme';

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
    event: 'First direct sourcing trip to Colombia',
  },
  {
    month: 'Jun',
    year: 2015,
    event: 'Began to open up direct trade relationships in Guatemala, Colombia, Kenya, and Brazil',
  },
  {
    month: 'Mar',
    year: 2017,
    event: 'Began work to open our second location in Mills/50',
  },
];

const About = () => (
  <div>
    <PageHeading
      backgroundImage="https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-3.jpg?13474976391752750718"
      heading="About"
      subheading="Lineage’s Lineal Legacy"
    />
    <SectionHeading>Awards / Recognition</SectionHeading>
    <Awards>
      <Award href="http://www.goodfoodawards.org/winners/" rel="noopener" target="_blank">
        <img src="https://cdn.shopify.com/s/files/1/0746/4367/files/2017-good-food-winner.png?5579671480418304637" alt="Good Food™ Award Winner 2017: Coffee" title="Good Food™ Award Winner 2017: Coffee" />
      </Award>
    </Awards>
    <SectionHeading>About</SectionHeading>
    <Content>
      <p>
        Lineage Coffee Roasting is a craft coffee roaster from Orlando, FL
        set on sharing our love of coffee with our community. We’re
        passionate about uncovering the nuances and complexities of each
        coffee we source, roast, and serve, and telling the stories behind them.
      </p>
    </Content>
    <SectionHeading>Lineage Timeline</SectionHeading>
    <Grid>
      {timeline.map(event => (
        <TimelineEvent
          key={`${event.year}${event.month}`}
          month={event.month}
          inBetween={event.inBetween ? true : undefined}
          year={event.year}
          event={event.event}
        />
      ))}
    </Grid>
    <StoreHours />
  </div>
);

/**
 * Styles
 */

const Grid = glamorous.div({
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingBottom: 2 * grid,
  paddingLeft: grid,
  paddingRight: grid,
  paddingTop: 0,

  '@media (min-width: 600px)': {
    maxWidth: '50em',
    paddingBottom: 3 * grid,
    paddingLeft: 2 * grid,
    paddingRight: 2 * grid,
  },
});

const SectionHeading = glamorous.h1({
  fontFamily: font.kaufmann,
  fontSize: font.up6,
  marginBottom: 0,
  marginTop: 2 * grid,
  textAlign: 'center',
});

/* Awards */

const Awards = glamorous.div({
  display: 'grid',
  gridColumnGap: grid,
  gridTemplateColumns: '1fr 1fr 1fr',
  justifyItems: 'center',
  paddingBottom: grid,
  paddingLeft: grid,
  paddingRight: grid,
  paddingTop: grid,

  '@media (min-width: 600px)': {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '60em',
    paddingLeft: 2 * grid,
    paddingRight: 2 * grid,
  },
});

const Award = glamorous.a({
  display: 'block',

  '& img': {
    height: 'auto',
    width: '100%',
  },
});

/* Content */

const Content = glamorous.div({
  paddingBottom: 2 * grid,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: grid,
  paddingRight: grid,
  maxWidth: '55em',

  '@media (min-width: 600px)': {
    paddingLeft: 2 * grid,
    paddingRight: 2 * grid,
  },

  '& p': {
    fontSize: font.up1,
    marginBottom: grid,
    marginTop: grid,
    lineHeight: 1.6,
  },
});

export default About;
