import React, { SyntheticEvent } from 'react';

import * as Styled from './styles';

interface FAQProps {
  answer: string;
  question: string;
}

interface FAQState {
  fullHeight: number | string;
  isMeasuring: boolean;
  isOpen: boolean;
}

class FAQ extends React.Component<FAQProps, FAQState> {
  state = {
    fullHeight: 'auto',
    isMeasuring: true,
    isOpen: false,
  };

  toggle = (e: SyntheticEvent) => {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { question, answer } = this.props;
    return (
      <>
        <Styled.Trigger onClick={this.toggle} isOpen={this.state.isOpen}>
          {question}
        </Styled.Trigger>
        <Styled.Answer
          fullHeight={this.state.fullHeight}
          isMeasuring={this.state.isMeasuring}
          isOpen={this.state.isOpen}
        >
          <Styled.AnswerInner>{answer}</Styled.AnswerInner>
        </Styled.Answer>
      </>
    );
  }
}

export default FAQ;
