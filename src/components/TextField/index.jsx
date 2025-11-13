// src/components/InputField.js
import { useTheme } from "@theme/useTheme";
import { TextInput } from "react-native";

export default function InputField({
  value,
  onChangeText,
  placeholder = "",
  style,
  secureTextEntry = false,
  keyboardType = "default",
  editable = true,
}) {
  const { colors } = useTheme();
  const c = colors.controls.input;

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={c.placeholderColor}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      editable={editable}
      style={[
        {
          height: c.height,
          backgroundColor: c.backgroundColor,
          borderRadius: c.borderRadius,
          borderWidth: c.borderWidth,
          borderColor: c.borderColor,
          paddingHorizontal: c.paddingHorizontal,
          color: c.textColor,
        },
        style,
      ]}
    />
  );
}
