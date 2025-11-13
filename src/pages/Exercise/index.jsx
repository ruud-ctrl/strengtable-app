import React, { useCallback, useMemo, useState } from "react";
import { View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Alert, StyleSheet } from "react-native";
import PageWrapper from "@components/PageWrapper";
import Text, { H1 } from "@components/Text";
import { useNavigation } from "@react-navigation/native";
import { useExercises } from "@hooks/useExercises";
import { useTheme } from "@theme/useTheme";
import ExerciseTile from "./ExerciseTile";

export default function Exercise() {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const { exercises, addExercise, deleteExercise, updateExercise } = useExercises();

    const data = exercises?.data || [];
    const isLoading = exercises?.isLoading;
    const isError = exercises?.isError;
    const refetch = exercises?.refetch;

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
        // You already have this route name in your headerRightAction
        navigation.navigate("Create New Exercise");
    }, [navigation]);

    const handleEdit = useCallback(
        (item) => {
            // Reuse your create screen as "edit" or change to your dedicated edit route
            navigation.navigate("Create New Exercise", { mode: "edit", id: item.id, exercise: item });
        },
        [navigation]
    );

    const confirmDelete = useCallback(
        (item) => {
            Alert.alert(
                "Delete exercise",
                `Are you sure you want to delete “${item.name ?? "this exercise"}”?`,
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                            try {
                                await deleteExercise(item.id);
                            } catch (e) {
                                // Snackbar is already handled in the hook's onError
                            }
                        },
                    },
                ]
            );
        },
        [deleteExercise]
    );

    const Item = useCallback(
        ({ item }) => (
            <ExerciseTile item={item} handleEdit={handleEdit} confirmDelete={confirmDelete} />
        ),
        [colors, handleEdit, confirmDelete]
    );

    const keyExtractor = useCallback((item) => String(item.id), []);

    const EmptyState = useMemo(
        () => (
            <View style={styles.emptyWrap}>
                <Text style={[styles.emptyTitle, { color: colors.text }]}>No exercises yet</Text>
                <Text style={[styles.emptySubtitle, { color: colors.muted }]}>
                    Tap the + button to create your first exercise.
                </Text>
            </View>
        ),
        [colors]
    );

    const headerRightAction = useCallback(() => handleAdd(), [handleAdd]);

    // Loading & error states
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
                    Failed to load exercises.
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
            headerRightIcon={"add-outline"}
            headerRightAction={headerRightAction}
            onRefresh={handleRefresh}
        >
            <H1 style={{ color: colors.text, marginBottom: 12 }}>Exercises</H1>
            {body}
        </PageWrapper>
    );
}

const styles = StyleSheet.create({
    separator: {
        height: 8,
    },

});
