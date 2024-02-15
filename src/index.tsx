import { useState } from "react";
import { DevSettings, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SensorType, useAnimatedSensor } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { Foreground } from "./Foreground";
import { Cameo } from "./Cameo";
import { Status } from "./types";
import { sleep } from "./services/sleep";
import { sing } from "./services/sing";

export default function App() {
  const [status, setStatus] = useState<Status>("idle");
  const { sensor } = useAnimatedSensor(SensorType.ROTATION, {
    interval: 20,
  });

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Cameo sensor={sensor} status={status} />
        <Foreground sensor={sensor} status={status} />
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onLongPress={() => DevSettings.reload()}
          onPress={async () => {
            if (status === "idle") {
              setStatus("title");
              await sleep(2000);
              setStatus("animating");
              sing();
              await sleep(2000);
              setStatus("video");
            }
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
