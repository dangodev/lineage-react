import React from 'react';
import PropTypes from 'prop-types';

import Styled from './styles';

const TimelineEvent = props => (
  <Styled.Container inBetween={props.inBetween}>
    {(props.year || props.month) &&
      <Styled.Date>
        <Styled.Year>{props.year}</Styled.Year>
        <Styled.Month>{props.month}</Styled.Month>
      </Styled.Date>
    }
    <Styled.Details inBetween={props.inBetween}>
      {props.event}
    </Styled.Details>
  </Styled.Container>
);

TimelineEvent.defaultProps = {
  event: '',
  month: '',
  inBetween: false,
  year: '',
};

TimelineEvent.propTypes = {
  event: PropTypes.string,
  inBetween: PropTypes.bool,
  month: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default TimelineEvent;
