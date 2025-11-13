import { useMemo, useState } from "react";
import { Platform, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function DropdownSelect({
  items = [],
  value = null,
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
  // local open state
  const [openInternal, setOpenInternal] = useState(false);
  const open = openProp !== undefined ? openProp : openInternal;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenInternal;

  // normalize items
  const dpItems = useMemo(() => {
    return items.map((it) =>
      typeof it === "string" ? { label: it, value: it } : it
    );
  }, [items]);

  // dynamic zIndex: when open, push above everything else
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
        value={value}
        items={dpItems}
        setOpen={setOpen}
        setValue={(fn) => {
          const next = typeof fn === "function" ? fn(value) : fn;
          onChange(next);
        }}
        setItems={() => {}}
        placeholder={placeholder}
        multiple={multiple}
        mode={multiple ? "BADGE" : "SIMPLE"}
        searchable={searchable}
        listMode={listMode}
        flatListProps={{ nestedScrollEnabled: true }}
        disabled={disabled}
        labelStyle={labelStyle}
        listItemLabelStyle={listItemLabelStyle}
        dropDownContainerStyle={[
          {
            zIndex: dynamicZIndex + 1,
            elevation: Platform.OS === "android" ? dynamicZIndex + 1 : 0,
          },
          dropDownContainerStyle,
        ]}
      />
    </View>
  );
}
