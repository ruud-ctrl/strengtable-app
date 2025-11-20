import { useTheme } from "@theme/useTheme";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Platform, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function DropDownSelect({
  items = [],
  value,                // can be number | string | null | undefined
  onChange = () => {},
  placeholder = "Select an option",
  multiple = false,
  searchable = false,
  listMode = "SCROLLVIEW",
  open: openProp,
  setOpen: setOpenProp,
  containerStyle,
  dropDownContainerStyle,
  labelStyle,
  listItemLabelStyle,
  zIndex = 1000,
  disabled = false,
}) {
  const { colors } = useTheme();
  const c = colors.controls.input;

  // --- open state (controlled or internal) ---
  const [openInternal, setOpenInternal] = useState(false);
  const open = openProp !== undefined ? openProp : openInternal;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenInternal;

  // --- normalize items ---
  const dpItems = useMemo(
    () =>
      items.map((it) =>
        typeof it === "string" ? { label: it, value: it } : it
      ),
    [items]
  );

  // --- value state (sync with parent) ---
  const [internalValue, setInternalValue] = useState(
    value ?? (multiple ? [] : null)
  );

  useEffect(() => {
    // whenever parent changes value (incl. to null), sync local state
    setInternalValue(value ?? (multiple ? [] : null));
  }, [value, multiple]);

  const handleSetValue = useCallback(
    (next) => {
      const resolved =
        typeof next === "function" ? next(internalValue) : next;

      setInternalValue(resolved);
      onChange(resolved);
    },
    [internalValue, onChange]
  );

  const dynamicZIndex = open ? 9999 : zIndex;

  return (
    <View
      style={[
        {
          zIndex: dynamicZIndex,
          elevation: Platform.OS === "android" ? dynamicZIndex : 0,
        },
        containerStyle,
      ]}
    >
      <DropDownPicker
        open={open}
        value={internalValue}
        items={dpItems}
        setOpen={setOpen}
        setValue={handleSetValue}
        setItems={() => {}}
        placeholder={placeholder}
        multiple={multiple}
        mode={multiple ? "BADGE" : "SIMPLE"}
        searchable={searchable}
        listMode={listMode}
        flatListProps={{ nestedScrollEnabled: true }}
        disabled={disabled}
        style={{
          backgroundColor: c.backgroundColor,
          borderRadius: c.borderRadius,
          borderWidth: c.borderWidth,
          borderColor: c.borderColor,
          paddingHorizontal: c.paddingHorizontal,
        }}
        labelStyle={[
          {
            color: "white",
          },
          labelStyle,
        ]}
        placeholderStyle={{
          color: "white",
          opacity: 0.5
        }}
        listItemLabelStyle={[
          {
            color: "white",
          },
          listItemLabelStyle,
        ]}
        dropDownContainerStyle={[
          {
            zIndex: dynamicZIndex + 1,
            backgroundColor: c.backgroundColor,
            borderRadius: c.borderRadius,
            borderWidth: c.borderWidth,
            borderColor: c.borderColor,
            elevation: Platform.OS === "android" ? dynamicZIndex + 1 : 0,
          },
          dropDownContainerStyle,
        ]}
      />
    </View>
  );
}
