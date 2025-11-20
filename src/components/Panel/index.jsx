import { TouchableOpacity, View } from "react-native";

const Panel = ({ children ,onLongPress, onPress }) => {

  const hasActions = onLongPress || onPress;

  const style = {
          backgroundColor: "#111",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: "#333",
          gap: 4,
        }

  if (!hasActions) {
    return (
      <View
        style={style}
      >
        {children}
      </View>
    );
  }

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={onPress}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
};


export default Panel