// src/ToastHost.js
import React, { useEffect, useRef } from "react";
import { Animated, Text, Pressable, StyleSheet } from "react-native";
import { atom, useRecoilState } from "recoil";

export const infoState = atom({
  key: "infoState",
  default: { open: false, message: "" },
});

export default function ToastHost() {
  const [info, setInfo] = useRecoilState(infoState);

  const y = useRef(new Animated.Value(-80)).current;
  const timeoutRef = useRef(null);

  const close = () => {
    setInfo({ open: false, message: "" });
  };

  useEffect(() => {
    if (info.open) {
      Animated.timing(y, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        Animated.timing(y, {
          toValue: -80,
          duration: 200,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) close();
        });
      }, 3500);
    } else {
      Animated.timing(y, {
        toValue: -80,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [info.open, y]);

  if (!info.open) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: y }] }]}>
      <Pressable onPress={close} style={styles.toast}>
        <Text style={styles.text}>{info.message}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
    elevation: 9999,
  },
  toast: {
    marginTop: 40,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#0D47A1",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  text: { color: "white", fontWeight: "600" },
});
