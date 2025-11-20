import { useRef, useState } from 'react'
import { View } from 'react-native'
import { KeyValuePair, BottomSheet, DropDownSelect, Text } from '@components'
import { UnitsOptions } from '@constants/enums'

const UnitSettings = ({data, setUnits}) => {
  const [selectedUnits, setSelectedUnits] = useState(null);

  const unitSheetRef = useRef(null);

  const onChangeUnits = async (newUnits) => {
    setSelectedUnits(newUnits);
    await setUnits({ value: newUnits });
    unitSheetRef.current?.close();
  };

  return (
    <>
        <KeyValuePair label="Units" value={data?.preferred_units ?? "metric"} onPress={() => unitSheetRef.current?.open()} />
      <BottomSheet
        ref={unitSheetRef}
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
              Select Units Type
            </Text>
          </View>
        }
      >
        <DropDownSelect
          items={UnitsOptions}
          value={selectedUnits}
          onChange={onChangeUnits}
          placeholder="Select a fruit"

        />
      </BottomSheet>
    </>
  )
}

export default UnitSettings