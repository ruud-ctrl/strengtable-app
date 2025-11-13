import { P } from "@components/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";
import { useTheme } from "@theme/useTheme";

const KeyValuePair = ({ label, value, onPress }) => {
    const { colors } = useTheme();

    const isPressable = typeof onPress === "function"

    // Shared style for both Pressable and View
    const baseStyle = {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 8,
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomColor: colors.base?.[700] || "white",
        borderBottomWidth: 1,
    };

    // The inner content
    const Content = (
        <>
            <P style={{ color: colors.contrast[100] }}>{label}</P>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                {typeof value === "string" || typeof value === "number" ? (
                    <P style={{ color: colors.contrast[400] }}>{String(value)}</P>
                ) : (
                    value
                )}
                {isPressable &&
                    <Ionicons
                        name={"arrow-forward-outline"}
                        color={colors.contrast[900]}
                        size={20}
                        style={{ marginLeft: 6 }}
                    />
                }
            </View>
        </>
    );

    // If onPress is provided → Pressable, otherwise plain View
    if (isPressable) {
        return (
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    baseStyle,
                    {
                        opacity: pressed ? 0.7 : 1,
                    },
                ]}
            >
                {Content}
            </Pressable>
        );
    }

    // Non-clickable fallback
    return <View style={baseStyle}>{Content}</View>;
};

export default KeyValuePair;
