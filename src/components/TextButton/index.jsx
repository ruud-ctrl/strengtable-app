import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@theme/useTheme";
import { Platform, Pressable, Text } from "react-native";

/**
 * TextButton — lightweight text-only button
 * Props:
 * - title (string)
 * - onPress (function)
 * - color (optional override)
 * - disabled (boolean)
 * - leftIcon / rightIcon (Ionicons name)
 * - size: 'sm' | 'md' | 'lg'
 * - underline (boolean)
 * - fullWidth (boolean)
 */
export default function TextButton({
  title,
  onPress,
  color,
  disabled = false,
  leftIcon,
  rightIcon,
  size = "md",
  underline = false,
  fullWidth = false,
  iconProps,
  textStyle,
  style,
  ...rest
}) {
  const { colors } = useTheme();

  // pull accent/text color from theme if no explicit color
  const defaultColor = "#3ddac5";

  const SIZES = {
    sm: { font: 12, pad: 2, icon: 14 },
    md: { font: 14, pad: 4, icon: 16 },
    lg: { font: 16, pad: 6, icon: 18 },
  };
  const sz = SIZES[size] ?? SIZES.md;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={
        Platform.OS === "android"
          ? { color: "rgba(0,0,0,0.08)", borderless: true }
          : undefined
      }
      style={[
        {
          opacity: disabled ? 0.4 : 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: fullWidth ? "center" : "flex-start",
          alignSelf: fullWidth ? "stretch" : "auto",
          paddingVertical: sz.pad,
        },
        style,
      ]}
      {...rest}
    >
      {leftIcon ? (
        <Ionicons
          name={leftIcon}
          size={sz.icon}
          color={defaultColor}
          style={{ marginRight: 6 }}
          {...iconProps}
        />
      ) : null}

      {title ? (
        <Text
          style={[
            {
              color: defaultColor,
              fontSize: sz.font,
              textDecorationLine: underline ? "underline" : "none",
              fontWeight: "500",
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      ) : null}

      {rightIcon ? (
        <Ionicons
          name={rightIcon}
          size={sz.icon}
          color={defaultColor}
          style={{ marginLeft: 6 }}
          {...iconProps}
        />
      ) : null}
    </Pressable>
  );
}
