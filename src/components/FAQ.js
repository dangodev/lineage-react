import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';


import { color, font, grid, transition } from '../lib/theme';

/**
 * Component
 */

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
      <Container isOpen={this.state.isOpen}>
        <Trigger onClick={e => this.toggle(e)} isOpen={this.state.isOpen}>
          {this.props.faq.question}
        </Trigger>
        <Answer
          innerRef={(el) => { this.answer = el; }}
          fullHeight={this.state.fullHeight}
          isMeasuring={this.state.isMeasuring}
          isOpen={this.state.isOpen}
        >
          <AnswerInner>{this.props.faq.answer}</AnswerInner>
        </Answer>
      </Container>
    );
  }
}

FAQ.propTypes = {
  faq: PropTypes.object.isRequired,
};

/**
 * Styles
 */

const Container = glamorous.div({
});

const Trigger = glamorous.button(
  {
    appearance: 'none',
    background: 'none',
    border: 'none',
    boxShadow: `0 1px rgba(${color.black}, 0.5)`,
    cursor: 'pointer',
    display: 'block',
    fontFamily: font.din,
    fontSize: '1em',
    fontWeight: 500,
    outline: 'none',
    paddingBottom: 0.25 * grid,
    paddingLeft: 0,
    paddingRight: 1.5 * grid,
    paddingTop: 0.25 * grid,
    position: 'relative',
    textAlign: 'left',
    textTransform: 'uppercase',
    transition: 'background-color 200ms',
    width: '100%',

    '::after': {
      boxShadow: `2px 2px rgb(${color.black})`,
      content: '""',
      height: 0.25 * grid,
      position: 'absolute',
      right: 0.25 * grid,
      top: '50%',
      transition: `transform 200ms ${transition.standard}`,
      width: 0.25 * grid,
    },

    ':hover': {
      backgroundColor: `rgba(${color.black}, 0.05)`,
    },
  },
  props => ({
    '::after': {
      transform: props.isOpen ? 'rotate(-135deg)' : 'translateY(-75%) rotate(45deg)',
    },
  })
);

const Answer = glamorous.div(
  {
    overflow: 'hidden',

    '@media (min-width: 600px)': {
      paddingLeft: '37.5%',
    },

    '& p': {
      marginBottom: 0,
      marginTop: 0,
      maxWidth: '20em',

      '& + p': {
        marginTop: grid,
      },
    },
  },
  props => ({
    height: props.isMeasuring ? 'auto' : (props.isOpen ? props.fullHeight : 0),
    transition: props.isMeasuring ? 'none' : `height 200ms ${transition.standard}`,
  })
);

const AnswerInner = glamorous.div({
  paddingBottom: grid,
  paddingTop: 0.5 * grid,
});

export default FAQ;
