import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useRef, useState } from "react";
import { Animated, Platform, Pressable, View } from "react-native";
import { useTheme } from "@theme/useTheme";

/**
 * Props:
 * - checked?: boolean                 // controlled
 * - defaultChecked?: boolean          // uncontrolled
 * - onChange?: (next: boolean) => void
 * - disabled?: boolean
 * - label?: string | React.ReactNode
 * - helperText?: string
 * - errorText?: string
 * - labelPosition?: "right" | "left"  // default "right"
 * - size?: number                     // icon size, default 20
 * - style?: object                    // wrapper style (outer container)
 * - boxStyle?: object                 // checkbox box style
 * - labelStyle?: object
 * - activeColor?: string              // override selected bg/icon color
 */
const Lockbox = ({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  helperText,
  errorText,
  labelPosition = "right",
  size = 20,
  style,
  boxStyle,
  labelStyle,
  activeColor,
}) => {
  const { colors } = useTheme();

  // uncontrolled support
  const [internal, setInternal] = useState(!!defaultChecked);
  const isChecked = checked !== undefined ? checked : internal;

  const setChecked = useCallback(
    (next) => {
      if (checked === undefined) setInternal(next);
      onChange?.(next);
    },
    [checked, onChange]
  );

  const toggle = useCallback(() => {
    if (disabled) return;
    setChecked(!isChecked);
  }, [disabled, isChecked, setChecked]);

  // animation
  const scale = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  };

  // colors
  const subtle = "#ddd";
  const border = colors.base?.[300] ?? "#e5e5e5";
  const baseBg = "#222";
  const selected = "#AAA";

  const boxBg = isChecked ? baseBg : baseBg;
  const iconName = isChecked ? "lock-closed-outline" : "lock-open-outline";
  const iconColor = isChecked ? selected : subtle;

  return (
    <View>
        <Pressable
          onPress={toggle}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isChecked, disabled }}
          android_ripple={
            Platform.OS === "android" && !disabled ? { color: colors.base?.[200] ?? "#eee", borderless: true } : undefined
          }
        >
          <Animated.View
            style={[
              {
                width: 32,
                height: 32,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: isChecked ? selected : border,
                backgroundColor: boxBg,
                alignItems: "center",
                justifyContent: "center",
                opacity: disabled ? 0.6 : 1,
                transform: [{ scale }],
              },
              boxStyle,
            ]}
          >
            <Ionicons name={iconName} size={size} color={iconColor} />
          </Animated.View>
        </Pressable>

    </View>
  );
};

export default Lockbox;
