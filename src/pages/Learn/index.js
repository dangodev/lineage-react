import React from 'react';

import BrewGuide from 'components/BrewGuide';
import LineageAcademyBlock from 'components/LineageAcademyBlock';
import PageHeading from 'components/PageHeading';

import Styled from './styles';

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
    title: 'Cold Brew',
    description: 'This quick, aerating brewing method doesn’t sacrifice flavor. Ideal for light-to-medium roasts.',
    image: 'https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-8.jpg?13474976391752750718',
    time: '4 – 6 min',
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
    <Styled.BrewHeading>Brew Guides</Styled.BrewHeading>
    <Styled.Grid>
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
    </Styled.Grid>
    <LineageAcademyBlock />
  </div>
);

export default Learn;
