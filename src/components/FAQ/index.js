import React from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import Styled from './styles';

class FAQ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullHeight: 'auto',
      isMeasuring: true,
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.resizeHandler = this.resizeHandler.bind(this);
  }

  componentDidMount() {
    this.setState({
      fullHeight: this.answer.getBoundingClientRect().height,
      isMeasuring: false,
    });
  }

  componentWillMount() {
    this.resize$ = Observable.fromEvent(window, 'resize')
      .debounceTime(16)
      .subscribe(() => this.resizeHandler);
  }

  componentWillUnmount() {
    this.resize$.unsubscribe();
  }

  resizeHandler() {
    this.setState({ isMeasuring: true }, () =>
      this.setState({
        fullHeight: this.answer.getBoundingClientRect().height,
        isMeasuring: false,
      }));
  }

  toggle(e) {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <Styled.Container isOpen={this.state.isOpen}>
        <Styled.Trigger onClick={e => this.toggle(e)} isOpen={this.state.isOpen}>
          {this.props.faq.question}
        </Styled.Trigger>
        <Styled.Answer
          innerRef={(el) => { this.answer = el; }}
          fullHeight={this.state.fullHeight}
          isMeasuring={this.state.isMeasuring}
          isOpen={this.state.isOpen}
        >
          <AnswerInner>{this.props.faq.answer}</AnswerInner>
        </Styled.Answer>
      </Styled.Container>
    );
  }
}

FAQ.propTypes = {
  faq: PropTypes.object.isRequired,
};

export default FAQ;
