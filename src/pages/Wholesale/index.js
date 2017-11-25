import React from 'react';
import PropTypes from 'prop-types';

import ProductList from 'components/ProductList';
import PageHeading from 'components/PageHeading';
import WholesaleFAQ from 'components/WholesaleFAQ';

import Styled from './styles';

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
      <Styled.Grid>
        <Styled.Content>
          <h2>Wholesale Partnership</h2>
          <p>
            In the 4 short years we’ve been around, we’ve beaten more
            established roasters in national competitions, and gained access
            to unique, world-class strains of coffee few other roasters can
            match. We take pride in our pursuit, and we’re not content until
            we’re the best roaster in the country.
          </p>
          <p>
            That same roast quality doesn’t diminish with higher wholesale
            volume. We also work with you on a regular basis to make sure you
            have the perfect type of coffee experience for you, in the amount
            you need. Nothing goes to waste, and you have access to some of
            the finest coffees on planet earth.
          </p>
        </Styled.Content>
        <Styled.Photo>
          <img src="https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-1.jpg?18319206570450494323" />
        </Styled.Photo>
      </Styled.Grid>
      <Styled.Grid>
        <Styled.Content>
          <h2>Supporting Lineage is supporting sustainable coffee</h2>
          <p>
            Lineage’s dedication to quality coffee doesn’t stop at our
            borders. We’ve built face-to-face relationships with farmers and
            exporters in South American and African nations. All of our
            coffee comes from cartel-free laborers in safe working conditions
            that we’ve either inspected for ourselves or are partners with
            those we trust.
          </p>
          <p>
            We pay far above fair trade value for coffee to ensure our
            partner farms make livable wages and stay in business as long as
            we do.
          </p>
        </Styled.Content>
        <Styled.Photo>
          <img src="https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-1.jpg?18319206570450494323" />
        </Styled.Photo>
      </Styled.Grid>
      <Styled.FAQHeading>Additional Info</Styled.FAQHeading>
      <WholesaleFAQ />
      <Styled.CTA>
        <Styled.CTAHeading>
          Ready to get started?
        </Styled.CTAHeading>
        <p>
          Send an email to <a
          href="mailto:wholesale@lineageroasting.com">wholesale@lineageroasting.com</a> when
          you‘re ready to get an estimate.
        </p>
      </Styled.CTA>
      <Styled.ProductWrapper>
        <Styled.ProductHeading>
          Test out a 5lb bag of our most popular wholesale coffees:
        </Styled.ProductHeading>
        <ProductList products={wholesaleProducts} isShowing />
      </Styled.ProductWrapper>
    </div>
  );
};

Wholesale.propTypes = {
  allProducts: PropTypes.array.isRequired,
};

export default Wholesale;
