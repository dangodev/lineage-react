import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import * as Styled from './styles';

class FAQ extends React.Component {
  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.resize$ = Observable.fromEvent(window, 'resize')
        .debounceTime(16)
        .subscribe(() => this.resizeHandler);
    }
  }

  componentDidMount() {
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

  state = {
    fullHeight: 'auto',
    isMeasuring: true,
    isOpen: false,
  };

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
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

FAQ.propTypes = {
  faq: PropTypes.object.isRequired,
};

export default FAQ;
