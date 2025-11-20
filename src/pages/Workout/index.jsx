import { useCallback, useMemo } from "react";
import { View, FlatList, Alert } from "react-native";
import { Text, PageWrapper, DataWrapper, Refresher } from "@components";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@theme/useTheme";
import { usePersonal } from "@hooks/usePersonal";
import { useWorkouts } from "@hooks/useWorkouts";
import WorkoutTile from "./WorkoutTile";

export default function Workouts() {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const { workouts, deleteWorkout } = useWorkouts();
    const { userProfile: { data: userProfile } } = usePersonal();

    const handleAdd = useCallback(() => {
        navigation.navigate("Create New Workout");
    }, [navigation]);

    const onSelect = useCallback(
        (item) => {
            navigation.navigate("SingleWorkout", { id: item.id });
        },
        [navigation]
    );

    const confirmDelete = useCallback(
        (item) => {
            Alert.alert(
                "Delete workout",
                `Are you sure you want to delete “${item.name ?? "this workout"}”?`,
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                            try {
                                console.log(item)
                                await deleteWorkout(item.id);
                            } catch (e) {
                            }
                        },
                    },
                ]
            );
        },
        [deleteWorkout]
    );

    const Item = useCallback(
        ({ item }) => (
            <WorkoutTile item={item} onLongPress={confirmDelete} onPress={onSelect} />
        ),
        [colors, confirmDelete]
    );

    const keyExtractor = useCallback((item) => String(item.id), []);

    const EmptyState = useMemo(
        () => (
            <View >
                <Text style={[{}, { color: colors.text }]}>No workouts yet</Text>
                <Text style={[{}, { color: colors.muted }]}>
                    Tap the + button to create your first workout.
                </Text>
            </View>
        ),
        [colors]
    );

    const headerRightAction = useCallback(() => handleAdd(), [handleAdd]);

    return (
        <PageWrapper
            scroll={false}
            headerRightIcon={"add-outline"}
            headerRightAction={headerRightAction}
            onRefresh={workouts.refetch}
            refreshing={workouts.isFetching}
            pageHeading={"Workouts"}
        >
            <DataWrapper query={workouts} errorMessage="Failed to load workouts.">
                {(data) => (
                    <FlatList
                        data={data}
                        keyExtractor={keyExtractor}
                        renderItem={Item}
                        ListEmptyComponent={EmptyState}
                        contentContainerStyle={[data.length === 0 && { flex: 1 }]}
                        refreshControl={
                            <Refresher isFetching={workouts.isFetching} refetch={workouts.refetch} />
                        }
                    />
                )}
            </DataWrapper>
        </PageWrapper>
    );
}
