import Panel from "@components/Panel";
import { Caption, P } from "@components/Text";
import { Ionicons } from "@expo/vector-icons";
import React from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@theme/useTheme";

const ExerciseTile = ({ item, handleEdit, confirmDelete }) => {
    const { colors } = useTheme();
    return (
        <View>
            <Panel>
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
                    <View style={{ flexDirection: "row", position: "absolute", right: 10 }}>
                        <TouchableOpacity
                            onPress={() => handleEdit(item)}
                            accessibilityLabel="Edit exercise"
                        >
                            <Ionicons name="pencil-outline" size={18} color={"#d953ff"} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => confirmDelete(item)}
                            accessibilityLabel="Delete exercise"
                        >
                            <Ionicons name="trash-outline" size={18} color={"#d9534f"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Panel>


        </View>
    )
}

export default ExerciseTile