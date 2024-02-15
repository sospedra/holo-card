import { Video } from "expo-av"
import { sleep } from "./sleep"

export const turnVolumeUp = async (video: Video | null) => {
  for (const index in Array.from({ length: 10 })) {
    video?.setVolumeAsync(Number(index) / 10 + 0.1)
    await sleep(500)
  }
} 