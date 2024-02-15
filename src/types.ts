import { AnimatedSensor, ValueRotation } from "react-native-reanimated"

export type Status = 'idle' | 'title' | 'animating' | 'video'
export type Sensor = AnimatedSensor<ValueRotation>['sensor']