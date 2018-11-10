import React from 'react';

import BrewGuide from 'components/BrewGuide';
import LineageAcademyBlock from 'components/LineageAcademyBlock';
import PageHeading from 'components/PageHeading';

import * as Styled from './styles';

const brewGuides = [
  {
    title: 'Pour-over',
    description: 'No other brewing method can match the pour-over’s control and flexibility.',
    image: 'https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-6.jpg?13474976391752750718',
    time: '5 – 8 min',
    link: 'https://medium.com/@LineageAcademy/how-to-make-perfect-pour-over-coffee-5f3200a6ac3b',
  },
  {
    title: 'Chemex',
    description: 'Great for brewing larger amounts of coffee without sacrificing flavor',
    image: 'https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-5.jpg?13474976391752750718',
    time: '10 – 15 min',
    link: 'https://medium.com/@LineageAcademy/how-to-brew-chemex-coffee-69bd2fb216f7',
  },
  {
    title: 'Cold Brew',
    description: 'The best way to get chilled coffee with full-bodied flavor and low acidity.',
    image: 'https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-8.jpg?13474976391752750718',
    time: '12 – 16 hours',
    link: 'https://medium.com/@LineageAcademy/how-to-make-cold-brew-coffee-at-home-d5b372f780ad',
  },

];

const Learn = () => (
  <div>
    <PageHeading
      backgroundImage="https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-3.jpg?13474976391752750718"
      backgroundPosition="center 90%"
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
