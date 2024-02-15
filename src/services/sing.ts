import * as Haptics from "expo-haptics";
import { sleep } from "./sleep";

export const sing = async () => {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  await sleep(300);
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  await sleep(100);
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  await sleep(200);
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  await sleep(200);
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  await sleep(500);
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  await sleep(300);
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};
