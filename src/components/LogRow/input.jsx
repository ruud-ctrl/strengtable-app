import KgDropdown from "@components/InputField/KGInput";
import Lockbox from "@components/InputField/LockBox";
import InputIntegerField from "@components/InputField/NumberField";
import { View } from "react-native";

const LogRow = ({ row, onChange }) => {
  const onKgChange = useCallback((kg) => onChange({ kg }), [onChange]);
  const onRepsChange = useCallback((reps) => onChange({ reps }), [onChange]);
  const onLockedChange = useCallback(
    (next) => onChange({ locked: next }),
    [onChange]
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <KgDropdown
        value={row.kg}
        onChange={onKgChange}
        step={row.kgStep ?? 2.5}
        min={row.kgMin ?? 0}
        max={row.kgMax ?? 300}
      />

      <InputIntegerField
        value={row.reps}
        onChangeNumber={onRepsChange}
        min={1}
        required
        clearable={false}
        unitLabel="reps"     // shows "reps" to the right of the input
        placeholder="0"
      />

      <Lockbox
        checked={row.locked}
        onChange={onLockedChange}
        labelPosition="left"
        activeColor="#222"
      />
    </View>
  );
};

export default LogRow