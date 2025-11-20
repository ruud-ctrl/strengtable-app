import { useNavigation } from "@react-navigation/native";
import {Panel, Text} from "@components";
import { useTheme } from "@theme/useTheme";

const ProgramTile = ({ item, onPress, onLongPress }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    if (!item) return null;

    return (
        <Panel 
            onLongPress={() => onLongPress?.(item)}
            onPress={() => onPress(item)}
        >
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 4 }}>
                {item.name}
            </Text>

            <Text style={{ fontSize: 15, opacity: 0.8, marginBottom: 6 }}>
                {item.description}
            </Text>

        </Panel>
    );
};

export default ProgramTile;
