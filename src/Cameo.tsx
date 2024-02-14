import { useRef } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  AnimatedSensor,
  ValueRotation,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Video } from "expo-av";

export const Cameo = (props: { rotation: AnimatedSensor<ValueRotation> }) => {
  const video = useRef<Video>(null);
  const astyle = useAnimatedStyle(() => {
    const { pitch, roll } = props.rotation.sensor.value;
    return {
      transform: [
        { translateX: withSpring(roll * -50, { damping: 200 }) },
        // Subtract 1 to pitch to compensate people holding phones tilted
        { translateY: withSpring((pitch - 1) * -200, { damping: 200 }) },
      ],
    };
  });

  return (
    <Animated.View style={[astyle, { width: "100%", height: "100%" }]}>
      <Video
        ref={video}
        source={require("../assets/cameo.mp4")}
        isLooping
        isMuted
        shouldPlay
        style={{ flex: 1 }}
      />
      <BlurView intensity={50} style={StyleSheet.absoluteFill} />
    </Animated.View>
  );
};
