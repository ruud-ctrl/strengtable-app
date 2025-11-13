import React, { useCallback, useMemo, useState } from "react";
import { View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Alert, StyleSheet } from "react-native";
import PageWrapper from "@components/PageWrapper";
import Text, { H1 } from "@components/Text";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@theme/useTheme";
import WorkoutTile from "./WorkoutTile";
import { useWorkouts } from "@hooks/useWorkouts";

export default function Workouts() {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const { workouts, addWorkout, deleteWorkout } = useWorkouts();

    const data = workouts?.data || [];
    const isLoading = workouts?.isLoading;
    const isError = workouts?.isError;
    const refetch = workouts?.refetch;

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = useCallback(async () => {
        if (!refetch) return;
        setRefreshing(true);
        try {
            await refetch();
        } finally {
            setRefreshing(false);
        }
    }, [refetch]);

    const handleAdd = useCallback(() => {
        navigation.navigate("Create New Workout");
    }, [navigation]);

      const onSelect = useCallback(
        (workout) => {
          navigation.navigate("SingleWorkout", { id: workout.id });
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
                                await deleteWorkout(item.id);
                            } catch (e) {
                                // Snackbar is already handled in the hook's onError
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
            <WorkoutTile item={item} confirmDelete={confirmDelete} onSelect={onSelect} />
        ),
        [colors, confirmDelete]
    );

    const keyExtractor = useCallback((item) => String(item.id), []);

    const EmptyState = useMemo(
        () => (
            <View style={styles.emptyWrap}>
                <Text style={[styles.emptyTitle, { color: colors.text }]}>No workouts yet</Text>
                <Text style={[styles.emptySubtitle, { color: colors.muted }]}>
                    Tap the + button to create your first exercise.
                </Text>
            </View>
        ),
        [colors]
    );

    const headerRightAction = useCallback(() => handleAdd(), [handleAdd]);

    let body = null;

    if (isLoading) {
        body = (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        );
    } else if (isError) {
        body = (
            <View>
                <Text style={{ color: colors.danger || "#d9534f", marginBottom: 8 }}>
                    Failed to load workouts.
                </Text>
                <TouchableOpacity onPress={handleRefresh} style={[ { borderColor: colors.border }]}>
                    <Text style={{ color: colors.text }}>Try again</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        body = (
            <FlatList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={Item}
                ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.border }]} />}
                ListEmptyComponent={EmptyState}
                contentContainerStyle={[data.length === 0 && { flex: 1 }]}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={colors.text} />
                }
            />
        );
    }

    return (
        <PageWrapper
            scroll={false}
            headerRightIcon={"add-outline"}
            headerRightAction={headerRightAction}
            onRefresh={handleRefresh}
        >
            <H1 style={{ color: colors.text, marginBottom: 12 }}>Workouts</H1>
            {body}
        </PageWrapper>
    );
}

const styles = StyleSheet.create({
    separator: {
        height: 8,
    },

});
