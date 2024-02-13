import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Foreground } from "./Foreground";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Cameo } from "./Cameo";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Cameo />
        <Foreground />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fabada",
    alignItems: "center",
    justifyContent: "center",
  },
});
