import { useCallback, useMemo, useRef } from 'react';
import { FlatList, View } from 'react-native';
import {PageWrapper, DataWrapper, WeightInputSheet, Refresher} from '@components'
import { usePersonal } from '@hooks/usePersonal';
import { useTheme } from "@theme/useTheme";
import WeightTile from './WeightTile';

const WeightHistory = () => {
  const { getWeight } = usePersonal();
  const weightSheetRef = useRef(null);
  const { colors } = useTheme();

  const handleAdd = useCallback(() => weightSheetRef.current?.open?.(), []);

  // const onSelect = useCallback(
  //   (item) => {
  //     console.log(item)
  //   },
  //   []
  // );

  // const confirmDelete = useCallback(
  //   (item) => {
  //     Alert.alert(
  //       "Delete workout",
  //       `Are you sure you want to delete “${item.name ?? "this workout"}”?`,
  //       [
  //         { text: "Cancel", style: "cancel" },
  //         {
  //           text: "Delete",
  //           style: "destructive",
  //           onPress: async () => {
  //             try {
  //               console.log(item)
  //               await deleteWorkout(item.id);
  //             } catch (e) {
  //             }
  //           },
  //         },
  //       ]
  //     );
  //   },
  //   [deleteWorkout]
  // );

  const Item = useCallback(
    ({ item }) => (
      <WeightTile item={item}
      // onLongPress={confirmDelete} onPress={onSelect} 
      />
    ),
    [colors]
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
    <PageWrapper title={"Weight History"}
      scroll={false}
      headerRightIcon={"add-outline"}
      headerRightAction={headerRightAction}
      onRefresh={getWeight.refetch}
      refreshing={getWeight.isFetching}
    >
      <DataWrapper query={getWeight} errorMessage="Failed to load workouts.">
        {(data) => (
          <View>
            <FlatList
              style={{ height: 1000 }}
              data={data}
              keyExtractor={keyExtractor}
              renderItem={Item}
              ListEmptyComponent={EmptyState}
              contentContainerStyle={[data.length === 0 && { flex: 1 }]}
              refreshControl={<Refresher isFetching={getWeight.isFetching} refetch={getWeight.refetch} />}
              />
            <WeightInputSheet ref={weightSheetRef}  refetch={getWeight.refetch} />
          </View>
        )}
      </DataWrapper>
    </PageWrapper>
  )
}

export default WeightHistory