import { forwardRef, useState } from "react";
import { View, Text } from "react-native";
import { BottomSheet, Button } from "@components";
import KGInput from "./KGInput";
import { usePersonal } from "@hooks/usePersonal";

const WeightBottomSheet = forwardRef(function WeightBottomSheet({refetch=() =>{}}, ref) {
  const {setNewWeight} = usePersonal()
  const [weight, setWeight] = useState(null);

  const handleSubmit = () => {
    setNewWeight({"value": weight})
    ref.current?.close()
    refetch()
    setWeight(0)
  }
  return (
    <BottomSheet
      ref={ref}
      modalHeight={380}
      modalStyle={{
        backgroundColor: "#101214",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}
      contentContainerStyle={{ gap: 12 }}
      HeaderComponent={
        <View style={{ padding: 16 }}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            Add Current Weight
          </Text>
        </View>
      }
    >
      <KGInput value={weight} onChange={setWeight} />
      <Button
        title={"Submit"}
        onPress={handleSubmit}
      />
    </BottomSheet>
  );
});

export default WeightBottomSheet;
