import { useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ClipPath, Rect, Svg, Text as SVGText } from "react-native-svg";
import { Sensor, Status } from "./types";
import { Shine } from "./Shine";
import { Frame } from "./Frame";

const RECT_WIDTH = 120;
const AnimatedRect = Animated.createAnimatedComponent(Rect);

export const Foreground = (props: { sensor: Sensor; status: Status }) => {
  const window = useWindowDimensions();
  const inset = useSafeAreaInsets();
  const scale = useSharedValue(1);
  const rect = useSharedValue(-RECT_WIDTH);
  const animatedStyle = useAnimatedStyle(() => {
    const { pitch, roll } = props.sensor.value;
    const translateY =
      props.status === "video" ? 0 : withSpring(pitch * 15, { damping: 120 });
    const translateX =
      props.status === "video" ? 0 : withSpring(roll * 15, { damping: 120 });

    return {
      transform: [
        {
          scale: scale.value,
        },
        { translateX },
        { translateY },
      ],
    };
  });
  const animateRect = useAnimatedProps(() => {
    return {
      x: rect.value,
    };
  });

  useEffect(() => {
    if (props.status === "animating") {
      scale.value = withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 500 }),
        withTiming(10, { duration: 1500 })
      );
    } else if (props.status === "title") {
      rect.value = withTiming(0, { duration: 2000 });
    } else if (props.status === "idle") {
      scale.value = 1.05;
    } else if (props.status === "video") {
      scale.value = 0;
    }
  }, [props.status]);

  return (
    <Animated.View style={[s.expand, StyleSheet.absoluteFill, animatedStyle]}>
      <Frame width={window.width} height={window.height} />
      <Shine {...props} />

      <View style={StyleSheet.absoluteFill}>
        <View
          style={[
            s.banner,
            { borderBottomWidth: 4, marginTop: inset.bottom + 10, height: 80 },
          ]}
        >
          <Svg viewBox={`0 -5 ${RECT_WIDTH} 8`} height={"100%"} width={"100%"}>
            <ClipPath id="clip">
              <AnimatedRect
                width="100%"
                height="100"
                y="-50"
                animatedProps={animateRect}
              />
            </ClipPath>

            <SVGText
              fontSize={16}
              fontWeight={"bold"}
              fill="#fff"
              clipPath="#clip"
            >
              Chuck Norris
            </SVGText>
          </Svg>
        </View>
        <View style={[s.expand, { justifyContent: "flex-end" }]}>
          <Svg
            viewBox={`-6 -28 200 200`}
            style={{
              width: window.width,
              height: window.width,
              transform: [{ rotate: "270deg" }],
            }}
          >
            <SVGText
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              fontSize="36"
              fontFamily={Platform.select({
                ios: "Menlo",
                default: "monospace",
              })}
            >
              cameo
            </SVGText>
          </Svg>
        </View>
        <View
          style={[s.banner, { borderTopWidth: 4, marginBottom: inset.bottom }]}
        >
          <Text style={[s.title, { textAlign: "right" }]}>
            A gift from <Text style={{ fontWeight: "bold" }}>John Doe</Text>
          </Text>
          <Text style={[s.title, { textAlign: "right", fontSize: 12 }]}>
            Sent at Feb 13, 2023
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const s = StyleSheet.create({
  expand: { flex: 1 },
  banner: {
    borderColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Menlo",
      default: "monospace",
    }),
  },
});
