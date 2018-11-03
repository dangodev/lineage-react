import * as React from 'react';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import * as Styled from './styles';

class FAQ extends React.Component {
  componentDidMount() {
    if (!this.answer && !this.answer.current) {
      return false;
    }

    if (typeof window !== 'undefined') {
      this.resize$ = Observable.fromEvent(window, 'resize')
        .debounceTime(16)
        .subscribe(() => this.resizeHandler);
    }

    this.setState({
      fullHeight: this.answer.current.getBoundingClientRect().height,
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

  answer = React.createRef();

  resize$: any;

  resizeHandler = () => {
    if (!this.answer && !this.answer.current) {
      return false;
    }

    this.setState({ isMeasuring: true }, () =>
      this.setState({
        fullHeight: this.answer.current.getBoundingClientRect().height,
        isMeasuring: false,
      })
    );
  };

  toggle = e => {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { faq } = this.props;

    return (
      <div isOpen={this.state.isOpen}>
        <Styled.Trigger onClick={e => this.toggle(e)} isOpen={this.state.isOpen}>
          {faq.question}
        </Styled.Trigger>
        <Styled.Answer
          innerRef={this.answer}
          fullHeight={this.state.fullHeight}
          isMeasuring={this.state.isMeasuring}
          isOpen={this.state.isOpen}
        >
          <Styled.AnswerInner>{faq.answer}</Styled.AnswerInner>
        </Styled.Answer>
      </div>
    );
  }
}

export default FAQ;
