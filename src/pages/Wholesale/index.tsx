import React from 'react';

import PageHeading from 'components/PageHeading';
import WholesaleFAQ from 'components/WholesaleFAQ';

import * as Styled from './styles';

const Wholesale: React.FunctionComponent = () => (
  <div>
    <PageHeading backgroundImage="https://cdn.shopify.com/s/files/1/0746/4367/files/Cafe_Sneak-13.jpg?1677585792213040243" />
    <Styled.Grid>
      <Styled.Content>
        <h2>Wholesale Partnership</h2>
        <p>
          We are passionate about producing the world’s best coffee and we will always be pushing
          the limits of what coffee can be. Since our inception in 2012 we have worked tirelessly to
          establish relationships with like minded growers. The seasonality of coffee and
          microclimates is reflected in our rotating menu as we seek to only serve the most freshly
          harvested coffee available. We are all about the details that must be perfect in order to
          achieve our vision to become the best roaster in the nation.
        </p>
        <p>
          We roast small lots that are sourced and picked by hand, we cup and dial in every coffee
          we serve all in the effort to create the perfect coffee. We want to work with people who
          share our passion for incredible coffees and the mission to be better.
        </p>
        <p>
          Our unique approach to education and coffee allows our wholesale partners to showcase the
          best coffees on earth while reflecting their own brand.
        </p>
        <p>Please email us. We want to work with you!</p>
      </Styled.Content>
      <Styled.Photo>
        <img src="https://cdn.shopify.com/s/files/1/0746/4367/files/Cafe_Sneak-22.jpg?4543001485930765123" />
      </Styled.Photo>
    </Styled.Grid>
    <Styled.FAQHeading>Additional Info</Styled.FAQHeading>
    <WholesaleFAQ />
    <Styled.Newsletter>
      <Styled.FAQHeading>Wholesale Deals</Styled.FAQHeading>
      <p>
        Regularly we send out our weekly specials and offers to our wholesale buyers.
        <br />
        Sign up for our regular email list to see what’s new! Unsubscribe any time. No spam.
        Promise.
      </p>
      <form
        action="https://lineageroasting.us14.list-manage.com/subscribe/post?u=5c1c7606596cf9a2e17a43836&id=174c40033a"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        noValidate
      >
        <fieldset>
          <label htmlFor="mce-EMAIL">Email Address</label>
          <input type="email" name="EMAIL" id="mce-EMAIL" />
        </fieldset>

        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input type="text" name="b_5c1c7606596cf9a2e17a43836_174c40033a" tabIndex={-1} value="" />
        </div>
        <input
          type="submit"
          value="Subscribe"
          name="subscribe"
          id="mc-embedded-subscribe"
          className="button"
        />
      </form>
    </Styled.Newsletter>
    <Styled.CTA>
      <Styled.CTAHeading>Ready to get started?</Styled.CTAHeading>
      <p>
        Send an email to{' '}
        <a href="mailto:wholesale@lineageroasting.com">wholesale@lineageroasting.com</a> when you‘re
        ready to get an estimate.
      </p>
    </Styled.CTA>
  </div>
);

export default Wholesale;
