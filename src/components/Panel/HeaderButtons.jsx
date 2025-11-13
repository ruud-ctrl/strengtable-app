import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform, Pressable, View } from "react-native";

export function HeaderIconButtons({ onInfo, onOptions, color = "#111" }) {
  return (
    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Pressable
        onPress={onInfo}
        hitSlop={10}
        style={{ paddingHorizontal: 6, paddingVertical: 4 }}
        android_ripple={Platform.OS === "android" ? { color: "rgba(0,0,0,0.1)", radius: 16 } : undefined}
        accessibilityLabel="Info"
      >
        <Ionicons name="information-circle-outline" size={22} color={color} />
      </Pressable>

      <Pressable
        onPress={onOptions}
        hitSlop={10}
        style={{ paddingHorizontal: 6, paddingVertical: 4 }}
        android_ripple={Platform.OS === "android" ? { color: "rgba(0,0,0,0.1)", radius: 16 } : undefined}
        accessibilityLabel="More options"
      >
        <Ionicons name="ellipsis-vertical" size={20} color={color} />
      </Pressable>
    </View>
  );

}