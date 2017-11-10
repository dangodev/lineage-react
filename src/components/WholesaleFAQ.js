import React from 'react';
import glamorous from 'glamorous';

import FAQ from './FAQ';

import { grid } from '../lib/theme';

const faqs = [
  {
    question: 'What is the minimum order?',
    answer: 'Each week, on FRIDAYS, we confirm orders with wholesale vendors. SATURDAY morning we ship your order, and we bill you using your information on file when your order ships. Cancellations for the week are no charge as long as you let us know by FRIDAY, 5p',
  },
  {
    question: 'How am I billed?',
    answer: 'It’s a flat rate for coffee + shipping, and we only bill your credit card when a shipment is on the way. Every now and then we even ship specialty roasts that are more expensive than what you pay, at no cost to you!',
  },
  {
    question: 'When do shipments go out?',
    answer: 'Each week, on FRIDAYS, we confirm orders with wholesale vendors. SATURDAY morning we ship your order, and we bill you using your information on file when your order ships. Cancellations for the week are no charge as long as you let us know by FRIDAY, 5p',
  },
  {
    question: 'What is the minimum commitment?',
    answer: 'Each week, on FRIDAYS, we confirm orders with wholesale vendors. SATURDAY morning we ship your order, and we bill you using your information on file when your order ships. Cancellations for the week are no charge as long as you let us know by FRIDAY, 5p',
  },
  {
    question: 'What if I decide to cancel my order for the week?',
    answer: 'Each week, on FRIDAYS, we confirm orders with wholesale vendors. SATURDAY morning we ship your order, and we bill you using your information on file when your order ships. Cancellations for the week are no charge as long as you let us know by FRIDAY, 5p',
  },
  {
    question: 'What if I decide to cancel altogether?',
    answer: 'Each week, on FRIDAYS, we confirm orders with wholesale vendors. SATURDAY morning we ship your order, and we bill you using your information on file when your order ships. Cancellations for the week are no charge as long as you let us know by FRIDAY, 5p',
  },
];

/**
 * Component
 */

const WholesaleFAQ = () => (
  <Container>
    {faqs.map(faq =>
      <FAQ faq={faq} key={faq.question} />
    )}
  </Container>
);

/**
 * Styles
 */

const Container = glamorous.div({
  marginTop: grid,
  marginBottom: grid,
  paddingLeft: grid,
  paddingRight: grid,

  '@media (min-width: 600px)': {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '60em',
    paddingLeft: 2 * grid,
    paddingRight: 2 * grid,
  },
});

export default WholesaleFAQ;
