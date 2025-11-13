import Text from "@components/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  View,
} from "react-native";
import { useTheme } from "@theme/useTheme";

function decimalsOf(n) {
  const s = `${n}`;
  const i = s.indexOf(".");
  return i === -1 ? 0 : s.length - i - 1;
}

export default function KgDropdown({
  value,
  defaultValue,
  onChange,
  step = 2.5,
  min = 0,
  max = 500,
  label,
  placeholder = "0.0 kg",
  disabled = false,
  modalTitle = "Select weight (kg)",
  containerStyle,
  triggerStyle,
  listItemHeight = 44,
}) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);

  // precision inferred from step (e.g. 2.5 -> 1, 0.25 -> 2)
  const precision = useMemo(() => decimalsOf(step), [step]);

  const clamp = useCallback(
    (n) => Math.min(max, Math.max(min, n)),
    [min, max]
  );

  const snapToStep = useCallback(
    (n) => {
      const k = Math.round((n - min) / step);
      const snapped = min + k * step;
      return Number(clamp(snapped).toFixed(precision));
    },
    [min, step, clamp, precision]
  );

  // uncontrolled internal value
  const [internal, setInternal] = useState(() => {
    const start = value ?? defaultValue ?? min;
    return snapToStep(start);
  });

  // keep internal in sync when controlled value changes
  useEffect(() => {
    if (value === undefined) return;
    setInternal(snapToStep(value));
  }, [value, snapToStep]);

  const current = value !== undefined ? value : internal;

  const setKg = useCallback(
    (kg) => {
      const next = snapToStep(kg);
      if (value === undefined) setInternal(next);
      onChange?.(next);
    },
    [onChange, snapToStep, value]
  );

  const increment = useCallback(() => setKg(current + step), [current, setKg, step]);
  const decrement = useCallback(() => setKg(current - step), [current, setKg, step]);

  // generate list options from min..max with given step
  const options = useMemo(() => {
    const out = []
    const steps = Math.floor((max - min) / step) + 1;
    for (let i = 0; i < steps; i++) {
      const v = Number((min + i * step).toFixed(precision));
      out.push(v);
    }
    // ensure max is included (in case of floating rounding)
    if (out[out.length - 1] !== max) out.push(Number(max.toFixed(precision)));
    return out;
  }, [min, max, step, precision]);

  const display = useMemo(
    () => (typeof current === "number" ? current.toFixed(precision) : placeholder),
    [current, precision, placeholder]
  );

  const subtle = colors.contrast?.[300] ?? "#999";
  const textColor = colors.contrast?.[100] ?? "#111";
  const bg = disabled ? colors.base?.[100] : colors.base?.[0] ?? "#fff";
  const border = colors.base?.[300] ?? "#e5e5e5";

  return (
    <View style={{flex: 1}}>
      <Pressable
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={[
          {
            minHeight: 32,
            borderWidth: 1,
            borderColor: border,
            borderRadius: 6,
            paddingHorizontal: 6,
            paddingVertical: 6,
            backgroundColor: "#222",
            opacity: disabled ? 0.6 : 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
          triggerStyle,
        ]}
      >
        <Text style={{ color: textColor, paddingHorizontal: 4}}>
          {display} kg
        </Text>
        <Ionicons name="chevron-down" size={18} color={subtle} />
      </Pressable>

      {/* Modal */}
      <Modal
        visible={open}
        transparent
        animationType={Platform.select({ ios: "slide", android: "fade" })}
        onRequestClose={() => setOpen(false)}
      >
        {/* Dimmed background */}
        <Pressable
          onPress={() => setOpen(false)}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.35)" }}
        />

        {/* Sheet */}
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            maxHeight: "70%",
            backgroundColor: colors.base?.[0] ?? "#fff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingBottom: 16,
          }}
        >
          {/* Header with steppers */}
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 12,
              paddingBottom: 8,
              borderBottomWidth: 1,
              borderBottomColor: colors.base?.[200] ?? "#eee",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Pressable onPress={decrement} hitSlop={10}>
              <Ionicons name="remove-circle-outline" size={24} color={subtle} />
            </Pressable>

            <Text style={{ fontWeight: "600", fontSize: 16, color: textColor }}>
              {modalTitle}
            </Text>

            <Pressable onPress={increment} hitSlop={10}>
              <Ionicons name="add-circle-outline" size={24} color={subtle} />
            </Pressable>
          </View>

          {/* Quick grid/list of values */}
          <FlatList
            data={options}
            keyExtractor={(n) => String(n)}
            initialScrollIndex={Math.max(
              0,
              options.findIndex((n) => n === snapToStep(current))
            )}
            getItemLayout={(_, index) => ({
              length: listItemHeight,
              offset: listItemHeight * index,
              index,
            })}
            renderItem={({ item }) => {
              const selected = item === snapToStep(current);
              return (
                <Pressable
                  onPress={() => {
                    setKg(item);
                    setOpen(false);
                  }}
                  style={{
                    height: listItemHeight,
                    paddingHorizontal: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: textColor }}>
                    {item.toFixed(precision)} kg
                  </Text>
                  {selected ? (
                    <Ionicons name="checkmark" size={18} color={textColor} />
                  ) : null}
                </Pressable>
              );
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.base?.[200] ?? "#eee",
                }}
              />
            )}
          />

          {/* Close row */}
          <View style={{ padding: 12, alignItems: "center" }}>
            <Pressable
              onPress={() => setOpen(false)}
              hitSlop={10}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: border,
              }}
            >
              <Text style={{ color: textColor }}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
