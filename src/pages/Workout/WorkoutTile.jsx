import { useTheme } from "@theme/useTheme";
import { useNavigation } from "@react-navigation/native";
import {Panel, Text} from "@components";

const WorkoutTile = ({ item, onPress, onLongPress }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    if (!item) return null;

    const createdDate = new Date(item.created_at).toLocaleDateString();

    return (
        <Panel
            onLongPress={() => onLongPress?.(item)}
            onPress={() => onPress(item)}
        >
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 4 }}>
                {item.program}
            </Text>

            <Text style={{ fontSize: 15, opacity: 0.8, marginBottom: 6 }}>
                {item.split}
            </Text>

            <Text style={{ fontSize: 13, color: "#aaa" }}>
                Created: {createdDate}
            </Text>

        </Panel>
    );
};

export default WorkoutTile;
