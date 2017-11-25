import React from 'react';

import FAQ from 'components/FAQ';

import Styled from './styles';

const faqs = [
  {
    question: 'What is the minimum order?',
    answer: 'Each week, on FRIDAYS, we confirm orders with wholesale vendors. SATURDAY morning we ship your order, and we bill you using your information on file when your order ships. Cancellations for the week are no charge as long as you let us know by FRIDAY, 5p',
  },
  {
    question: 'How am I billed?',
    answer: 'It’s a flat rate for coffee + shipping, and we only bill your credit card when a shipment is on the way. Every now and then we even ship specialty roasts that are more expensive than what you pay, at no cost to you!',
  },
  {
    question: 'When do shipments go out?',
    answer: 'Each week, on FRIDAYS, we confirm orders with wholesale vendors. SATURDAY morning we ship your order, and we bill you using your information on file when your order ships. Cancellations for the week are no charge as long as you let us know by FRIDAY, 5p',
  },
  {
    question: 'What is the minimum commitment?',
    answer: 'Each week, on FRIDAYS, we confirm orders with wholesale vendors. SATURDAY morning we ship your order, and we bill you using your information on file when your order ships. Cancellations for the week are no charge as long as you let us know by FRIDAY, 5p',
  },
  {
    question: 'What if I decide to cancel my order for the week?',
    answer: 'Each week, on FRIDAYS, we confirm orders with wholesale vendors. SATURDAY morning we ship your order, and we bill you using your information on file when your order ships. Cancellations for the week are no charge as long as you let us know by FRIDAY, 5p',
  },
  {
    question: 'What if I decide to cancel altogether?',
    answer: 'Each week, on FRIDAYS, we confirm orders with wholesale vendors. SATURDAY morning we ship your order, and we bill you using your information on file when your order ships. Cancellations for the week are no charge as long as you let us know by FRIDAY, 5p',
  },
];

const WholesaleFAQ = () => (
  <Styled.Container>
    {faqs.map(faq =>
      <FAQ faq={faq} key={faq.question} />
    )}
  </Styled.Container>
);

export default WholesaleFAQ;
