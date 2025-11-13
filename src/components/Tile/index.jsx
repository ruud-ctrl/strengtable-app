import { Platform, Pressable } from "react-native";

const Tile = ({
  children,
  active = false,
  onPress,
  onClick,             // alias (maps to onPress)
  disabled = false,
  style,
  activeStyle,
}) => {
  const baseStyle = {
    backgroundColor: "#111",
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginLeft: -8,
    marginRight: -8,
    gap: 4,
    borderWidth: 1,
    borderColor: "#1b1b1b",
  };

  const activeDefaultStyle = {
    backgroundColor: "#ffb2b2ff",
    borderColor: "#3b82f6", // accent border when active
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  };

  return (
    <Pressable
      onPress={onPress ?? onClick}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: active }}
      android_ripple={
        Platform.OS === "android" && !disabled
          ? { color: "rgba(255,255,255,0.08)", borderless: false }
          : undefined
      }
      style={({ pressed }) => [
        baseStyle,
        active && activeDefaultStyle,
        style,
        active && activeStyle,
        pressed && !disabled && { transform: [{ scale: 0.98 }] },
        disabled && { opacity: 0.6 },
      ]}
    >
      {children}
    </Pressable>
  );
};

export default Tile;
