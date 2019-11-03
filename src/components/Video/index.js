import React from 'react';

import bigLogo from '../../assets/lineage-full.svg';
import * as Styled from './styles';

class Video extends React.Component {
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
      <Styled.Container>
        <Styled.Stretch>
          <video
            loop
            autoPlay
            playsInline
            poster="https://cdn.shopify.com/s/files/1/0746/4367/files/home-reel-poster.jpg?2238910942592067902"
            muted
            ref={el => {
              this.video = el;
            }}
          >
            <source
              src="https://cdn.shopify.com/s/files/1/0746/4367/files/homepage-720.mp4?15396948752035854437"
              type="video/mp4"
            />
          </video>
        </Styled.Stretch>
        <Styled.Pink />
        <Styled.Pink2 />
        <Styled.BigLogo src={bigLogo} alt="Lineage Coffee Roasting, Orlando" />
      </Styled.Container>
    );
  }
}

export default Video;
