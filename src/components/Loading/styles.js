import { css } from "glamor";
import glamorous from "glamorous";

import { color, layer, transition } from "lib/theme";

const animation = {
  progress: css.keyframes({
    "0%": {
      transform: "scaleX(0)"
    },
    "25%": {
      transform: "scaleX(0.2)"
    },
    "50%": {
      transform: "scaleX(0.45)"
    },
    "75%": {
      transform: "scaleX(0.63)"
    },
    "100%": {
      transform: "scaleX(0.9)"
    }
  })
};

export const Container = glamorous.div(
  {
    animationDuration: "3s",
    animationFillMode: "forwards",
    animationIterationCount: 1,
    animationTimingFunction: transition.deceleration,
    backgroundColor: `rgb(${color.blue})`,
    height: 4,
    left: 0,
    pointerEvents: "none",
    position: "absolute",
    right: 0,
    top: 0,
    transformOrigin: "0 0",
    width: "100vw",
    zIndex: layer.loading
  },
  ({ isLoading }) => ({
    animationName: isLoading ? animation.progress : "",
    opacity: isLoading ? 1 : 0,
    transition: isLoading ? "none" : "opacity 200ms"
  })
);
