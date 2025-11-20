import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Alert, FlatList, View } from "react-native";
import { Text, PageWrapper, ErrorStatePanel, Refresher } from "@components";
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
    (item) => {
      navigation.navigate("SingleProgram", { id: item.id });
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
      <ProgramTile item={item} onLongPress={confirmDelete} onPress={onSelect} />
    ),
    [colors, confirmDelete]
  );

  const keyExtractor = useCallback((item) => String(item.id), []);

  const EmptyState = useMemo(
    () => (
      <View>
        <Text style={[{ color: colors.text }]}>No Programs yet</Text>
        <Text style={[{ color: colors.muted }]}>
          Tap the + button to create your first program.
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
      <ErrorStatePanel
        message="Failed to load programs."
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
                            <Refresher isFetching={programs.isFetching} refetch={programs.refetch} />
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
      pageHeading={"Programs"}
    >
      {body}
    </PageWrapper>
  );
}
