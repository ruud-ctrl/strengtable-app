import Panel from "@components/Panel";
import { Caption, P } from "@components/Text";
import { View } from "react-native";
import { useTheme } from "@theme/useTheme";
import { useNavigation } from "@react-navigation/native";

const ExerciseTile = ({ item, onPress, onLongPress }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <Panel 
            onLongPress={() => onLongPress?.(item)}
            onPress={() => onPress(item)}
        >
                <View
                    style={{
                        paddingVertical: 1,
                        borderTopWidth: 1,
                        borderTopColor: colors.base[200],
                    }}
                >
                    <P>
                        {item.name}
                    </P>
                    {item.muscle_group ? (
                        <Caption>{item.muscle_group}</Caption>
                    ) : null}
                    {item.exercise_type ? (
                        <Caption>{item.exercise_type}</Caption>
                    ) : null}
                    {item.equipment_type ? (
                        <Caption>{item.equipment_type}</Caption>
                    ) : null}
                    {item.description ? (
                        <Caption>{item.description}</Caption>
                    ) : null}
                </View>
            </Panel>
    )
}

export default ExerciseTile