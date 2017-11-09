import React from 'react';
import { css } from 'glamor';
import glamorous from 'glamorous';

import { color, grid, layer, transition } from '../lib/theme';

import bgReel from '../assets/home-reel.mp4';
import bigLogo from '../assets/lineage-full.svg';

class Video extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSource: bgReel,
    };
  }

  componentWillMount() {
    if (typeof window !== 'undefined' && window.screen.width && window.screen.width >= 680) {
      this.setState({ activeSource: bgReel });
    }
  }

  componentDidMount() {
    if (this.video) {
      this.video.play();
    }
  }

  componentWillUnmount() {
    if (this.video) {
      this.video.pause();
    }
  }

  render() {
    return (
      <Container>
        <Stretch>
          <video
            loop
            autoPlay
            playsInline
            muted
            ref={(el) => { this.video = el; }}
          >
            <source src={this.state.activeSource} type="video/mp4" />
          </video>
        </Stretch>
        <Pink />
        <Pink2 />
        <BigLogo src={bigLogo} alt="Lineage Coffee Roasters, Orlando" />
      </Container>
    );
  }
}

const Container = glamorous.div({
  backgroundColor: `rgb(${color.pink})`,
  height: '56vw',
  overflow: 'hidden',
  position: 'relative',
});

const Pink = glamorous.div({
  backgroundColor: `rgb(${color.pink})`,
  height: '100%',
  left: 0,
  mixBlendMode: 'multiply',
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: layer.base,
});

const Pink2 = glamorous.div({
  backgroundImage: `linear-gradient(rgba(${color.pink}, 0), rgba(${color.pink}, 1))`,
  backgroundSize: '100% 100%',
  height: '100%',
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: layer.base,
});

const fadeIn = css.keyframes({
  to: {
    transform: 'translate(-50%, -50%)',
    opacity: 1,
  },
});

const BigLogo = glamorous.img({
  animationDelay: '1s',
  animationDuration: '2s',
  animationFillMode: 'forwards',
  animationName: fadeIn,
  animationTimingFunction: transition.deceleration,
  height: 8 * grid,
  left: '50%',
  position: 'absolute',
  top: '50%',
  opacity: 0,
  transform: 'translate(-50%, -25%)',
  width: 5 * grid,
  zIndex: layer.base + 1,

  '@media (min-width: 600px)': {
    width: 8 * grid,
  },
});

const Stretch = glamorous.div({
  left: '50%',
  paddingTop: '56.25%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',

  '& video': {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
});


export default Video;
