import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

export default function KGInput({ value, onChange, placeholder = "0.0" }) {
  const [internal, setInternal] = useState(value ? String(value) : "");

  const handleChange = (text) => {
    // Remove invalid chars
    let cleaned = text.replace(/[^0-9.,]/g, "");

    // Convert comma → dot
    cleaned = cleaned.replace(",", ".");

    // Only allow one decimal point
    cleaned = cleaned.replace(/(\..*)\./g, "$1");

    // Limit to 1 decimal digit
    cleaned = cleaned.replace(/^(\d+)\.(\d).*/, "$1.$2");

    setInternal(cleaned);

    // Convert to number for parent
    if (onChange) {
      const num = cleaned === "" ? null : Number(cleaned);
      onChange(num);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        value={internal}
        onChangeText={handleChange}
        keyboardType="decimal-pad"
        placeholder={placeholder}
        placeholderTextColor="#666"
      />
      <View style={styles.unit}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#111",
    color: "#fff",
    fontSize: 18,
    borderRadius: 10,
  },
  unit: {
    marginLeft: 8,
  },
});
