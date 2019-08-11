import React from 'react';

import FAQ from 'components/FAQ';

import * as Styled from './styles';

const faqs = [
  {
    question: 'What is the minimum order?',
    answer: 'There’s no minimum, but all wholesale orders are in 5lb increments.',
  },
  {
    question: 'How am I billed?',
    answer:
      'As a wholesale customer, you can choose between weekly and monthly online invoicing. The higher your order, the more flexibility you have on pricing.',
  },
  {
    question: 'Can I change up my order?',
    answer:
      'As a wholesale customer, we talk with you every week to confirm your needs for the upcoming week.',
  },
  {
    question: 'When do shipments go out?',
    answer:
      'MONDAYS are when shipments go out, or are made available for pickup. This is because we roast on Saturday and taste test / package on Sunday. We ship to FL overnight. Local deliveries are also available.',
  },
  {
    question: 'What is the minimum wholesale contract length?',
    answer: 'We believe our coffee is the best, and therefore we don’t work on contracts.',
  },
  {
    question: 'Will you help me find equipment?',
    answer:
      'We’d love to! Not only will we recommend equipment; we have relationships with many high-end equipment manufacturers, and can purchase the equipment at below-retail prices.',
  },
];

const WholesaleFAQ: React.FunctionComponent = () => (
  <Styled.Container>
    {faqs.map(({ question, answer }) => (
      <FAQ question={question} answer={answer} key={question} />
    ))}
  </Styled.Container>
);

export default WholesaleFAQ;
