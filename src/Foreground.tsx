import {
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Circle,
  RadialGradient,
  Stop,
  Svg,
  Text as SVGText,
  G,
  Path,
  Ellipse,
  ClipPath,
  Mask,
  Defs,
  Use,
} from "react-native-svg";
import Animated, {
  AnimatedSensor,
  Extrapolation,
  ValueRotation,
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ForegroundSVG from "../assets/foreground.svg";
import { useEffect } from "react";

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedUse = Animated.createAnimatedComponent(Use)

export const Foreground = (props: {
  rotation: AnimatedSensor<ValueRotation>;
}) => {
  const window = useWindowDimensions();
  const inset = useSafeAreaInsets();
  const aprops = useAnimatedProps(() => {
    const { pitch, roll } = props.rotation.sensor.value;
    return {
      cx: interpolate(roll, [1.5, -1.5], [0, 1284]),
      cy: interpolate(pitch - 0.5, [1, -1], [0, 2778], Extrapolation.CLAMP),
    }
  })

  return (
    <View style={[s.expand, StyleSheet.absoluteFill]}>
      <ForegroundSVG width={window.width} height={window.height} />

      <Svg viewBox="0 0 1284 2778" style={{ position: "absolute" }}>
        <Defs>
          <AnimatedCircle id="shape" r="1200" animatedProps={aprops} />
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
            <Path d="M1284 0v2778H0V0h1284ZM235 1634c10.196 381.348 188.994 685 407.5 685s397.304-303.652 407.5-685v-364c0-397.369-182.444-720-407.5-720S235 872.631 235 1270v364Z"></Path>
          </G>
        </ClipPath>

        <Use href="#shape" fill="#fff" clipPath="#clip" opacity={0.10} />
      </Svg>

      <View style={StyleSheet.absoluteFill}>
        <View
          style={[s.banner, { borderBottomWidth: 4, marginTop: inset.top }]}
        >
          <Text style={[s.title, { fontSize: 38, fontWeight: "bold" }]}>
            Chuck norris
          </Text>
        </View>
        <View style={[s.expand, { justifyContent: "flex-end" }]}>
          <Svg
            viewBox={`-4 -24 200 200`}
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
    </View>
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
