import React from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import * as Styled from './styles';

class FAQ extends React.Component {
  state = {
    fullHeight: 'auto',
    isMeasuring: true,
    isOpen: false,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.resize$ = Observable.fromEvent(window, 'resize')
        .debounceTime(16)
        .subscribe(() => this.resizeHandler);
    }

    this.setState({
      fullHeight: this.answer.getBoundingClientRect().height,
      isMeasuring: false,
    });
  }

  componentWillUnmount() {
    if (this.resize$) {
      this.resize$.unsubscribe();
    }
  }

  resizeHandler = () => {
    this.setState({ isMeasuring: true }, () =>
      this.setState({
        fullHeight: this.answer.getBoundingClientRect().height,
        isMeasuring: false,
      })
    );
  };

  toggle = e => {
    e.preventDefault();
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render() {
    return (
      <>
        <Styled.Trigger onClick={e => this.toggle(e)} isOpen={this.state.isOpen}>
          {this.props.faq.question}
        </Styled.Trigger>
        <Styled.Answer
          innerRef={el => {
            this.answer = el;
          }}
          fullHeight={this.state.fullHeight}
          isMeasuring={this.state.isMeasuring}
          isOpen={this.state.isOpen}
        >
          <Styled.AnswerInner>{this.props.faq.answer}</Styled.AnswerInner>
        </Styled.Answer>
      </>
    );
  }
}

FAQ.propTypes = {
  faq: PropTypes.object.isRequired,
};

export default FAQ;
