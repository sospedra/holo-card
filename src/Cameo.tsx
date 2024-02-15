import { useEffect, useRef } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Audio, Video } from "expo-av";
import { Sensor, Status } from "./types";
import { turnVolumeUp } from "./services/turnVolumeUp";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const Cameo = (props: { sensor: Sensor; status: Status }) => {
  const video = useRef<Video>(null);
  const blur = useSharedValue(1);
  const scale = useSharedValue(1);
  const { width } = useWindowDimensions();
  const astyle = useAnimatedStyle(() => {
    const { pitch, roll } = props.sensor.value;
    const translateY =
      props.status === "video"
        ? withSpring(scale.value * 30)
        : // Subtract 1 to pitch to compensate people holding phones tilted
          withSpring((pitch - 1) * -200, { damping: 200 });
    const translateX =
      props.status === "video" ? 0 : withSpring(roll * -50, { damping: 200 });

    return {
      transform: [
        { scale: withSpring(scale.value) },
        { translateX },
        { translateY },
      ],
    };
  });
  const animateCinema = useAnimatedStyle(() => {
    const { pitch, roll } = props.sensor.value;
    const rad2deg = (rad: number) => (rad * 180) / Math.PI;
    if (props.status === "video") {
      return {
        transform: [
          { perspective: width / 2 },
          {
            rotateX: `${interpolate(
              rad2deg(pitch),
              [-360, 360],
              [30, -30],
              Extrapolation.CLAMP
            )}deg`,
          },
          {
            rotateY: `${interpolate(
              rad2deg(roll),
              [-360, 360],
              [-60, 60],
              Extrapolation.CLAMP
            )}deg`,
          },
        ],
      };
    }

    return {};
  });
  const animateBlur = useAnimatedStyle(() => {
    return {
      opacity: withTiming(blur.value, { duration: 3000 }),
    };
  });

  useEffect(() => {
    switch (props.status) {
      case "idle": {
        blur.value = 1;
        break;
      }
      case "animating": {
        video.current?.playFromPositionAsync(0)
        turnVolumeUp(video.current);
      }
      case "video": {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        scale.value = 1.2;
        blur.value = 0;
        break;
      }
    }
  }, [props.status]);

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    video.current?.setVolumeAsync(0);
  }, []);

  return (
    <Animated.View style={[astyle, { width: "100%", height: "100%" }]}>
      <Animated.View
        style={[
          { flex: 1, transform: [{ perspective: width / 2 }] },
          animateCinema,
        ]}
      >
        <Video
          ref={video}
          source={require("../assets/cameo.mp4")}
          isLooping
          shouldPlay
          isMuted={false}
          style={{ flex: 1 }}
        />
      </Animated.View>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            flex: 1,
            justifyContent: "flex-end",
            paddingBottom: 180,
            alignItems: "center",
          },
        ]}
      >
        <Text
          style={{
            backgroundColor: "#0000004D",
            color: "#fff",
            padding: 4,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          Hold press to restart experience
        </Text>
      </View>
      <AnimatedBlurView
        style={[StyleSheet.absoluteFill, animateBlur]}
        intensity={50}
      />
    </Animated.View>
  );
};
