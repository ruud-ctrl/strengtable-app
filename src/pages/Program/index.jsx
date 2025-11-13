import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import PageWrapper from "@components/PageWrapper";
import Text, {H1} from "@components/Text";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@theme/useTheme";
import { usePrograms } from "@hooks/usePrograms";
import { usePersonal } from "@hooks/usePersonal";
import ProgramTile from "./ProgramTile";

export default function Program() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { programs, addProgram, deleteProgram } = usePrograms();
  const { userProfile: { data: userProfile } } = usePersonal();

  const data = programs?.data || [];
  const isLoading = programs?.isLoading;
  const isError = programs?.isError;
  const refetch = programs?.refetch;

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
    navigation.navigate("Create New Program");
  }, [navigation]);

  const onSelect = useCallback(
    (program) => {
      navigation.navigate("SingleProgram", { id: program.id });
    },
    [navigation]
  );

  const confirmDelete = useCallback(
    (item) => {
      Alert.alert(
        "Delete program",
        `Are you sure you want to delete “${item.name ?? "this program"}”?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                await deleteProgram(item.id);
              } catch (e) {
                // Snackbar is already handled in the hook's onError
              }
            },
          },
        ]
      );
    },
    [deleteProgram]
  );

  const Item = useCallback(
    ({ item }) => (
      <ProgramTile item={item} confirmDelete={confirmDelete} onSelect={onSelect} />
    ),
    [colors, confirmDelete]
  );

  const keyExtractor = useCallback((item) => String(item.id), []);

  const EmptyState = useMemo(
    () => (
      <View>
        <Text style={[ { color: colors.text }]}>No workouts yet</Text>
        <Text style={[ { color: colors.muted }]}>
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
                ItemSeparatorComponent={() => <View style={[ { backgroundColor: colors.border }]} />}
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
