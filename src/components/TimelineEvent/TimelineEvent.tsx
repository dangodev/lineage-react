import * as React from 'react';
import * as Styled from './styles';

const TimelineEvent = (props: {
  event: string;
  inBetween: boolean;
  month: string;
  year: number;
}) => {
  const { event = '', inBetween = false, month = '', year = '' } = props;

  return (
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
};

export default TimelineEvent;
