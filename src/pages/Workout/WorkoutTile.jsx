import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "@components/Text";
import { useTheme } from "@theme/useTheme";
import { useNavigation } from "@react-navigation/native";

const WorkoutTile = ({ item, confirmDelete, onSelect }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    if (!item) return null;

    console.log(item)

    const createdDate = new Date(item.created_at).toLocaleDateString();

    return (
        <TouchableOpacity
            onLongPress={() => confirmDelete?.(item)}
            onPress={() => onSelect(item)}
            style={{
                backgroundColor: "#1e1e1e",
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "#333",
            }}
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

            <Text style={{ fontSize: 13, color: item.workout_state === "Active" ? "#4caf50" : "#f44336" }}>
                Status: {item.workout_state}
            </Text>

            {item.notes && (
                <Text style={{ fontSize: 13, color: "#ccc", marginTop: 6 }}>
                    Notes: {item.notes}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default WorkoutTile;
