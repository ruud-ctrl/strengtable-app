import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@theme/useTheme";

export default function ErrorStatePanel({
  message = "Something went wrong.",
  onRetry = () => {},
  showRetry = true,
  style = {},
  retryLabel = "Try again",
}) {
  const { colors } = useTheme();

  return (
    <View style={[{ marginVertical: 12 }, style]}>
      <Text
        style={{
          color: colors.danger || "#d9534f",
          marginBottom: 8,
          fontSize: 15,
        }}
      >
        {message}
      </Text>

      {showRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ color: colors.text }}>{retryLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
