import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SensorType, useAnimatedSensor } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { Foreground } from "./Foreground";
import { Cameo } from "./Cameo";

export default function App() {
  const rotation = useAnimatedSensor(SensorType.ROTATION, {
    interval: 20,
  });

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Cameo rotation={rotation} />
        <Foreground rotation={rotation} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
