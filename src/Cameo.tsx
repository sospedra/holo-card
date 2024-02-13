import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from 'expo-blur';
import { Video } from "expo-av";

export const Cameo = () => {
  const video = useRef<Video>(null);

  return (
    <View style={{ width:'100%', height:'100%' }}>
      <Video
        ref={video}
        source={require("../assets/cameo.mp4")}
        isLooping
        isMuted
        shouldPlay
        style={{ flex: 1 }}
      />
      <BlurView intensity={50} style={StyleSheet.absoluteFill} />
    </View>
  );
};
