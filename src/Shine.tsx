import { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Circle,
  RadialGradient,
  Stop,
  Svg,
  G,
  Path,
  ClipPath,
  Mask,
  Defs,
  Use,
} from "react-native-svg";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Sensor, Status } from "./types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CANVAS = {
  WIDTH: 1284,
  HEIGHT: 2778,
};

export const Shine = (props: { sensor: Sensor; status: Status }) => {
  const radius = useSharedValue(1000);
  const moveCircle = useAnimatedProps(() => {
    const { pitch, roll } = props.sensor.value;
    return {
      cx: interpolate(
        roll,
        [1, -1],
        [0, CANVAS.WIDTH],
        Extrapolation.CLAMP
      ),
      cy: interpolate(
        pitch - 0.75,
        [1, -1],
        [0, CANVAS.HEIGHT],
        Extrapolation.CLAMP
      ),
      r: withSpring(radius.value, { damping: 600 }),
    };
  });

  useEffect(() => {
    switch (props.status) {
      case "idle": {
        radius.value = 1000;
        break;
      }
      case "animating":
      case "video": {
        radius.value = 0;
        break;
      }
    }
  }, [props.status]);

  return (
    <Svg
      viewBox={`0 0 ${CANVAS.WIDTH} ${CANVAS.HEIGHT}`}
      style={StyleSheet.absoluteFill}
    >
      <Defs>
        <AnimatedCircle id="shape" animatedProps={moveCircle} />
        <RadialGradient id="gradient">
          <Stop offset="10%" stopColor="white" />
          <Stop offset="90%" stopColor="black" />
        </RadialGradient>
        <Mask id="mask">
          <Use href="#shape" fill="url(#gradient)" />
        </Mask>
      </Defs>

      <ClipPath id="clip">
        <G>
          {/* This path is part of the foreground.svg -- not magic numbers */}
          <Path d="M1284 0v2778H0V0h1284ZM235 1634c10.196 381.348 188.994 685 407.5 685s397.304-303.652 407.5-685v-364c0-397.369-182.444-720-407.5-720S235 872.631 235 1270v364Z"></Path>
        </G>
      </ClipPath>

      <Use href="#shape" fill="#fff" clipPath="#clip" opacity={0.2} />
    </Svg>
  );
};
