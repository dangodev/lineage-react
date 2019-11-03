import React, { useRef, useEffect } from 'react';

import bigLogo from '../../assets/lineage-full.svg';
import * as Styled from './styles';

const Video = () => {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video.current) {
      video.current.play();
    }
    return () => {
      if (video.current) {
        video.current.pause();
      }
    };
  }, []);

  return (
    <Styled.Container>
      <Styled.Stretch>
        <video
          loop
          autoPlay
          playsInline
          poster="https://cdn.shopify.com/s/files/1/0746/4367/files/home-reel-poster.jpg?2238910942592067902"
          muted
          ref={video}
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
};

export default Video;
