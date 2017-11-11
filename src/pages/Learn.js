import React from 'react';
import glamorous from 'glamorous';

import BrewGuide from '../components/BrewGuide';
import LineageAcademyBlock from '../components/LineageAcademyBlock';
import PageHeading from '../components/PageHeading';

import { font, grid } from '../lib/theme';

const brewGuides = [
  {
    title: 'French Press',
    description: 'French Press draws out the deep chocolate and smoky notes of roasts. Perfect for darker and medium roasts.',
    image: 'https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-7.jpg?13474976391752750718',
    time: '8 – 12 min',
    link: 'https://medium.com/lineage-academy/tagged/coffee-brewing',
  },
  {
    title: 'Pourover',
    description: 'The pourover method is perfect for highlighting brighter floral and citrus notes in light roasts.',
    image: 'https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-6.jpg?13474976391752750718',
    time: '5 – 8 min',
    link: 'https://medium.com/lineage-academy/tagged/coffee-brewing',
  },
  {
    title: 'Chemex',
    description: 'A well-rounded brewing method, chemex balances the bright and dark notes in any roast.',
    image: 'https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-5.jpg?13474976391752750718',
    time: '10 – 15 min',
    link: 'https://medium.com/lineage-academy/tagged/coffee-brewing',
  },
  {
    title: 'Aeropress',
    description: 'This quick, aerating brewing method doesn’t sacrifice flavor. Ideal for light-to-medium roasts.',
    image: 'https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-8.jpg?13474976391752750718',
    time: '4 – 6 min',
    link: 'https://medium.com/lineage-academy/tagged/coffee-brewing',
  },
  {
    title: 'Syphon',
    description: 'This strange contraption certainly doesn’t dissappoint. While it’s challenging to master, it can also produce some of the most complex flavors.',
    image: 'https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-5.jpg?13474976391752750718',
    time: '15 – 20 min',
    link: 'https://medium.com/lineage-academy/tagged/coffee-brewing',
  },
];

const Learn = () => (
  <div>
    <PageHeading
      backgroundImage="https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-3.jpg?13474976391752750718"
      heading="Learn"
      subheading="Expand your knowledge and your palette"
    />
    <BrewHeading>Brew Guides</BrewHeading>
    <Grid>
      {brewGuides.map(guide => (
        <BrewGuide
          key={guide.title}
          description={guide.description}
          image={guide.image}
          link={guide.link}
          time={guide.time}
          title={guide.title}
        />
      ))}
    </Grid>
    <LineageAcademyBlock />
  </div>
);

/**
 * Styles
 */

const Grid = glamorous.div({
  display: 'grid',
  gridColumnGap: grid,
  gridRowGap: 1.5 * grid,
  paddingBottom: 2 * grid,
  paddingLeft: grid,
  paddingRight: grid,
  paddingTop: 2 * grid,

  '@media (min-width: 600px)': {
    gridTemplateColumns: '1fr 1fr',
    paddingBottom: 3 * grid,
    paddingLeft: 2 * grid,
    paddingRight: 2 * grid,
  },

  '@media (min-width: 1080px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
});

const BrewHeading = glamorous.h1({
  fontFamily: font.kaufmann,
  fontSize: font.up6,
  marginBottom: 0,
  marginTop: 2 * grid,
  textAlign: 'center',
});

export default Learn;
