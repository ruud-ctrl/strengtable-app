import { Small } from "@components";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { useTheme } from "@theme/useTheme";


const InputField = forwardRef(
  (
    {
      label,
      helperText,
      errorText,

      value,
      defaultValue,
      onChangeText,

      disabled = false,
      clearable = true,

      secure = false,

      leftIconName,
      rightIconName,
      leftIcon,
      rightIcon,
      onLeftIconPress,
      onRightIconPress,

      showCounter = false,

      containerStyle,
      inputStyle,

      maxLength,
      multiline = false,
      numberOfLines,
      placeholder,
      ...textInputProps
    },
    ref
  ) => {
    const { colors } = useTheme();
    const inputRef = useRef(null);

    // uncontrolled support
    const [internal, setInternal] = useState(defaultValue ?? "");
    const current = value !== undefined ? value : internal;

    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const setVal = useCallback(
      (v) => {
        if (value === undefined) setInternal(v);
        onChangeText?.(v);
      },
      [onChangeText, value]
    );

    const onClear = useCallback(() => setVal(""), [setVal]);

    const borderColor = useMemo(() => {
      if (errorText) return "#ff6b6b";
      if (focused) return colors.contrast?.[100] ?? "#333";
      return colors.base?.[300] ?? "#e5e5e5";
    }, [errorText, focused, colors]);

    const bg = disabled ? colors.base?.[100] : colors.base?.[0] ?? "#fff";
    const textColor = colors.contrast?.[100] ?? "#111";
    const placeholderColor = colors.contrast?.[300] ?? "#999";
    const subtle = colors.contrast?.[300] ?? "#999";

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      getValue: () => current,
      setValue: (v) => setVal(v),
    }));

    const renderLeft = () => {
      if (leftIcon) return (
        <Pressable
          disabled={!onLeftIconPress}
          onPress={onLeftIconPress}
          hitSlop={10}
          style={{ marginRight: 8 }}
        >
          {leftIcon}
        </Pressable>
      );
      if (leftIconName)
        return (
          <Pressable
            disabled={!onLeftIconPress}
            onPress={onLeftIconPress}
            hitSlop={10}
            style={{ marginRight: 8 }}
          >
            <Ionicons name={leftIconName} size={18} color={subtle} />
          </Pressable>
        );
      return null;
    };

    const renderRight = () => {
      // secure toggle takes precedence if secure=true
      if (secure) {
        return (
          <Pressable
            onPress={() => setShowPassword((s) => !s)}
            hitSlop={10}
            style={{ marginLeft: 8 }}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={18}
              color={subtle}
            />
          </Pressable>
        );
      }

      // clear button (if enabled and has value)
      if (clearable && !!current && !disabled) {
        return (
          <Pressable onPress={onClear} hitSlop={10} style={{ marginLeft: 8 }}>
            <Ionicons name="close-circle" size={18} color={subtle} />
          </Pressable>
        );
      }

      // custom right content
      if (rightIcon)
        return (
          <Pressable
            disabled={!onRightIconPress}
            onPress={onRightIconPress}
            hitSlop={10}
            style={{ marginLeft: 8 }}
          >
            {rightIcon}
          </Pressable>
        );

      if (rightIconName)
        return (
          <Pressable
            disabled={!onRightIconPress}
            onPress={onRightIconPress}
            hitSlop={10}
            style={{ marginLeft: 8 }}
          >
            <Ionicons name={rightIconName} size={18} color={subtle} />
          </Pressable>
        );

      return null;
    };

    return (
      <View style={{flex: 1}}>
        {/* Label */}
        {label ? (
          <Small style={{ marginBottom: 6, color: textColor }}>{label}</Small>
        ) : null}

        {/* Field */}
        <View
          style={{
            minHeight: 36,
            borderWidth: 1,
            borderColor,
            borderRadius: 4,
            paddingHorizontal: 12,
            backgroundColor: bg,
            opacity: disabled ? 0.6 : 1,
            flexDirection: "row",
            alignItems: multiline ? "flex-start" : "center",
            paddingVertical: multiline ? 6 : 0,
          }}
        >
          {renderLeft()}

          <TextInput
            ref={inputRef}
            editable={!disabled}
            value={current}
            onChangeText={setVal}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines ?? 4 : 1}
            maxLength={maxLength}
            secureTextEntry={secure && !showPassword}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={[
              {
                flex: 1,
                color: textColor,
                paddingVertical: Platform.select({ ios: 6, android: 6 }),
              },
              inputStyle,
            ]}
            {...textInputProps}
          />

          {renderRight()}
        </View>

        {/* Helper / error / counter row */}
        <View
          style={{
            marginTop: 6,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {errorText ? (
            <Small style={{ color: "#ff6b6b" }}>{errorText}</Small>
          ) : helperText ? (
            <Small style={{ color: subtle }}>{helperText}</Small>
          ) : (
            <View />
          )}

          {showCounter && typeof maxLength === "number" ? (
            <Small style={{ color: subtle }}>
              {current?.length ?? 0} / {maxLength}
            </Small>
          ) : null}
        </View>
      </View>
    );
  }
);


export default InputField;
