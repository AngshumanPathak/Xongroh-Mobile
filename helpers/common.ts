import { Dimensions } from "react-native";


const { width: DeviceWidth, height: DeviceHeight } = Dimensions.get("window");

export const hp = (percentage: number) => {
    return (DeviceHeight * percentage) / 100;
}

export const wp = (percentage: number) => {
    return (DeviceWidth * percentage) / 100;
}