import { useCallback, useMemo, useState } from "react";
import { View, FlatList, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { PageWrapper, Text, H1, Refresher, ErrorStatepanel } from "@components";

import { useExercises } from "@hooks/useExercises";
import { usePersonal } from "@hooks/usePersonal";
import { useTheme } from "@theme/useTheme";

import ExerciseTile from "./ExerciseTile";

export default function Exercise() {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const { exercises, deleteExercise } = useExercises();
    const { userProfile: { data: userProfile } } = usePersonal();

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

    const onSelect = useCallback(
        (item) => {
            navigation.navigate("SingleExercise", { mode: "edit", id: item.id, exercise: item });
        },
        [navigation]
    );

    const handleEdit = useCallback(
        (item) => {
            navigation.navigate("SingleExercise", { mode: "edit", id: item.id, exercise: item });
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
            <ExerciseTile item={item} onLongPress={confirmDelete} onPress={onSelect} />
        ),
        [colors, confirmDelete]
    );

    const keyExtractor = useCallback((item) => String(item.id), []);

    const EmptyState = useMemo(
        () => (
            <View>
                <Text style={[{}, { color: colors.text }]}>No exercises yet</Text>
                <Text style={[{}, { color: colors.muted }]}>
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
            <View>
                <ActivityIndicator />
            </View>
        );
    } else if (isError) {
        body = (
<ErrorStatepanel
  message="Failed to load exercises."
  onRetry={handleRefresh}
/>
        );
    } else {
        body = (
            <FlatList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={Item}
                // ItemSeparatorComponent={() => <View  />}
                ListEmptyComponent={EmptyState}
                contentContainerStyle={[data.length === 0 && { flex: 1 }]}
                refreshControl={
                    <Refresher isFetching={refreshing} refetch={handleRefresh} />
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
            pageHeading={"Exercises"}
        >
            {body}
        </PageWrapper>
    );
}

