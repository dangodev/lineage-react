import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import ProductList from '../components/ProductList';
import PageHeading from '../components/PageHeading';
import WholesaleFAQ from '../components/WholesaleFAQ';

import { color, font, grid } from '../lib/theme';

const Wholesale = (props) => {
  const wholesaleProducts = props.allProducts
    .filter(product => product.collections.indexOf('wholesale') !== -1)
    .slice(0, 2);

  return (
    <div>
      <PageHeading
        backgroundImage="https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-1.jpg?13474976391752750718"
        heading="Wholesale"
        subheading="Good things come in bulk"
      />
      <Grid>
        <Content>
          <h2>Wholesale Partnership</h2>
          <p>
            In the 4 short years we’ve been around, we’ve beaten more
            established roasters in national competitions, and gained access
            to unique, world-class strains of coffee few other roasters can
            match. We take pride in our pursuit, and we’re not content until
            we’re the best roaster in the country.
          </p>
          <p>
            That same roast quality doesn’t diminish with higher wholesale
            volume. We also work with you on a regular basis to make sure you
            have the perfect type of coffee experience for you, in the amount
            you need. Nothing goes to waste, and you have access to some of
            the finest coffees on planet earth.
          </p>
        </Content>
        <Photo>
          <img src="https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-1.jpg?18319206570450494323" />
        </Photo>
      </Grid>
      <Grid>
        <Content>
          <h2>Supporting Lineage is supporting sustainable coffee</h2>
          <p>
            Lineage’s dedication to quality coffee doesn’t stop at our
            borders. We’ve built face-to-face relationships with farmers and
            exporters in South American and African nations. All of our
            coffee comes from cartel-free laborers in safe working conditions
            that we’ve either inspected for ourselves or are partners with
            those we trust.
          </p>
          <p>
            We pay far above fair trade value for coffee to ensure our
            partner farms make livable wages and stay in business as long as
            we do.
          </p>
        </Content>
        <Photo>
          <img src="https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-1.jpg?18319206570450494323" />
        </Photo>
      </Grid>
      <FAQHeading>Additional Info</FAQHeading>
      <WholesaleFAQ />
      <CTA>
        <CTAHeading>
          Ready to get started?
        </CTAHeading>
        <p>
          Send an email to <a
          href="mailto:wholesale@lineageroasting.com">wholesale@lineageroasting.com</a> when
          you‘re ready to get an estimate.
        </p>
      </CTA>
      <ProductWrapper>
        <ProductHeading>
          Test out a 5lb bag of our most popular wholesale coffees:
        </ProductHeading>
        <ProductList products={wholesaleProducts} isShowing />
      </ProductWrapper>
    </div>
  );
};

Wholesale.propTypes = {
  allProducts: PropTypes.array.isRequired,
};

/**
 * Styles
 */

/* CTA */

const CTA = glamorous.div({
  marginBottom: 2 * grid,
  marginTop: 2 * grid,
  paddingLeft: grid,
  paddingRight: grid,
  textAlign: 'center',

  '& p': {
    marginBottom: 0,
    marginTop: grid,

    '& a': {
      color: `rgb(${color.blue})`,
      fontWeight: 500,
      transition: 'color 200ms',

      ':hover': {
        color: `rgb(${color.blueT})`,
      },
    },
  },
});

const CTAHeading = glamorous.h3({
  fontFamily: font.kaufmann,
  fontSize: font.up4,
  marginBottom: grid,
  marginTop: 0,
});

/* FAQ */

const FAQHeading = glamorous.h3({
  fontFamily: font.kaufmann,
  fontSize: font.up4,
  marginBottom: 1.5 * grid,
  marginTop: 0,
  textAlign: 'center',
});

/* Grid */

const Grid = glamorous.div({
  marginBottom: 2 * grid,
  marginTop: 2 * grid,

  '@media (min-width: 800px)': {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: 0.5 * grid,
  },
});

const Content = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  gridColumnEnd: 6,
  gridColumnStart: 2,
  justifyContent: 'center',
  marginBottom: grid,
  marginTop: grid,
  paddingLeft: grid,
  paddingRight: grid,

  '@media (min-width: 800px)': {
    marginBottom: grid,
    marginTop: grid,
    paddingLeft: 0,
    paddingRight: 0,
  },

  '& h2': {
    fontSize: font.up2,
    fontWeight: 700,
    marginBottom: grid,
    marginTop: 0,
    textTransform: 'uppercase',
  },

  '& p': {
    fontSize: '1em',
    lineHeight: 1.5,
    marginBottom: 0,
    marginTop: 0,

    '& + p': {
      marginTop: grid,
    },
  },
});

const Photo = glamorous.figure({
  alignItems: 'center',
  display: 'flex',
  gridColumnEnd: 13,
  gridColumnStart: 7,
  margin: 0,
  padding: 0,

  '& img': {
    height: 'auto',
    width: '100%',
  },
});

/* Product */

const ProductHeading = glamorous.h3({
  fontFamily: font.kaufmann,
  fontSize: font.up4,
  marginBottom: 1.5 * grid,
  marginTop: 0,
  textAlign: 'center',
});

const ProductWrapper = glamorous.div({
  marginTop: 2 * grid,
  paddingBottom: 3 * grid,
  paddingLeft: grid,
  paddingRight: grid,
  paddingTop: 2 * grid,

  '@media (min-width: 600px)': {
    paddingLeft: 2 * grid,
    paddingRight: 2 * grid,
  },
});

export default Wholesale;
