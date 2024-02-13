import {
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Svg, Text as SVGText } from "react-native-svg";
import ForegroundSVG from "../assets/foreground.svg";

export const Foreground = () => {
  const window = useWindowDimensions();
  const inset = useSafeAreaInsets();

  return (
    <View style={[s.expand, StyleSheet.absoluteFill]}>
      <ForegroundSVG width={window.width} height={window.height} />
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
