import React from 'react';

import * as Styled from './styles';

interface TimelineEventProps {
  event: string;
  inBetween?: boolean;
  month?: string;
  year?: number | string;
}

const TimelineEvent: React.FunctionComponent<TimelineEventProps> = ({
  inBetween = false,
  month = '',
  year = '',
  event = '',
}) => (
  <Styled.Container inBetween={inBetween}>
    {(year || month) && (
      <Styled.Date>
        <Styled.Year>{year}</Styled.Year>
        <Styled.Month>{month}</Styled.Month>
      </Styled.Date>
    )}
    <Styled.Details inBetween={inBetween}>{event}</Styled.Details>
  </Styled.Container>
);

export default TimelineEvent;
