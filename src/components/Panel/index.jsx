import { View } from "react-native";

const Panel = ({children}) => {

  return (
    <View style={{
      backgroundColor: "#111",
      paddingHorizontal: 8,
      marginHorizontal: -8,
      paddingVertical: 16,
      gap: 4,

    }}>

      {children}
    </View>
  )
}

export default Panel