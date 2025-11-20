import { useCallback } from "react";
import { View } from "react-native";
import KgDropdown from "./KGInput";
import InputIntegerField from "./NumberField";

const LogRow = ({ row, onChange }) => {
  console.log(row)
  const onKgChange = useCallback((i) => onChange({id: row.id, "weight_used":i}));

  const onRepsChange = useCallback((i) => onChange({id: row.id, "reps":i}));
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>

      <KgDropdown
        defaultValue={row.weight_used != null ? parseFloat(row.weight_used) : undefined}
        onChange={onKgChange}
        step={row.kgStep ?? 2.5}
        min={row.kgMin ?? 0}
        max={row.kgMax ?? 300}
      />

      <InputIntegerField
        value={row.performed_reps}
        onChangeNumber={onRepsChange}
        min={1}
        required
        clearable={false}
        unitLabel="reps"
        placeholder="0"
      />

    </View>
  );
};

export default LogRow