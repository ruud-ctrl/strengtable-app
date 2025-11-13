import BottomSheet from '@components/BottomSheet'
import DropdownSelect from '@components/Dropdown'
import KeyValuePair from '@components/KeyValuePair'
import { useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { ThemeOptions } from '@constants/enums'

const ThemeSettings = ({ data, setTheme }) => {
  const themeSheetRef = useRef(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const onChangeTheme = async (newTheme) => {
    setSelectedTheme(newTheme);
    await setTheme({ value: newTheme });
    themeSheetRef.current?.close();
  };

  return (
    <>
      <KeyValuePair label="Theme" value={data?.theme ?? "system"} onPress={() => themeSheetRef.current?.open()} />
      <BottomSheet
        ref={themeSheetRef}
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
              Select Theme Color
            </Text>
          </View>
        }
      >
        <DropdownSelect
          items={ThemeOptions}
          value={selectedTheme}
          onChange={onChangeTheme}
          placeholder="Select a theme"

        />
      </BottomSheet>
    </>
  )
}

export default ThemeSettings