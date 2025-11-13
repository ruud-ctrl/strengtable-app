import { Small } from '@components/Text';
import { View } from 'react-native';
import { useTheme } from '@theme/useTheme';

const Chip = ({ label }) => {
  const { colors } = useTheme();
  const bg =colors.accent[300];
  const fg = colors.text?.light || "#fff";
  return (
    <View style={{
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
      backgroundColor: bg
    }}>
      <Small style={{ color: fg, fontWeight: "600" }}>{label}</Small>
    </View>
  );
}

export default Chip