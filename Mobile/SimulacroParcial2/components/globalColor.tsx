import { Platform } from "react-native";

export const globalColor = Platform.OS === "ios" ? "pink" : "yellow";
export const globalIcon = Platform.OS === "ios" ? "heart" : "star";