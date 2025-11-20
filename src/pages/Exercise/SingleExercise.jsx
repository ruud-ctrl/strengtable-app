import React, { useCallback, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { PageWrapper, Text, Caption, TextField, ErrorStatePanel, DropDownSelect } from "@components";
import { usePersonal } from "@hooks/usePersonal";
import { useExercise } from "@hooks/useExercise";
import { useTheme } from "@theme/useTheme";
import { MuscleGroupOptions, EquipmentTypeOptions, ExerciseTypeOptions } from "@constants/enums";

export default function EditExercise({ route }) {
  const id = route?.params?.id;

  const { colors } = useTheme();
  const {
    userProfile: { data: userProfile },
  } = usePersonal();

  const {exercise} = useExercise(id);
  const data = exercise?.data || {};
  const isLoading = exercise?.isLoading;
  const isError = exercise?.isError;
  const refetch = exercise?.refetch;

  const [refreshing, setRefreshing] = useState(false);

  // --- form state ---
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
  const [selectedEquipmentType, setSelectedEquipmentType] = useState(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);

  // dropdown open/close state
  const [openMG, setOpenMG] = useState(false);
  const [openEQ, setOpenEQ] = useState(false);
  const [openEX, setOpenEX] = useState(false);

  // --- initialize form when exercise data loads ---
  useEffect(() => {
    if (!data) return;

    setName(data.name ?? "");
    setDescription(data.description ?? "");
    setSelectedMuscleGroup(data.muscle_group);
    setSelectedEquipmentType(data.equipment_type);
    setSelectedExerciseType(data.exercise_type);
  }, [data]);

  const handleRefresh = useCallback(async () => {
    if (!refetch) return;
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  let body = null;

  if (!id) {
    body = (
      <View>
        <Text style={{ color: colors.danger || "#d9534f" }}>
          No exercise id provided.
        </Text>
      </View>
    );
  } else if (isLoading) {
    body = (
      <View>
        <ActivityIndicator />
      </View>
    );
  } else if (isError) {
    body = (
      <ErrorStatePanel
        message="Failed to load exercise."
        onRetry={handleRefresh}
      />
    );
  } else {
    body = (
      <View style={{ gap: 12 }}>
        <Caption>Exercise Name</Caption>
        <TextField
          value={name}
          onChangeText={setName}
          placeholder="Enter exercise name"
        />

        <Caption>Description</Caption>
        <TextField
          value={description}
          onChangeText={setDescription}
          placeholder="Enter exercise description"
          multiline
        />

        <Caption>Muscle Group</Caption>
        <DropDownSelect
          items={MuscleGroupOptions}
          value={selectedMuscleGroup}
          onChange={setSelectedMuscleGroup}
          placeholder={data.muscle_group}
          open={openMG}
          setOpen={(open) => {
            setOpenMG(open);
            if (open) {
              setOpenEQ(false);
              setOpenEX(false);
            }
          }}
          zIndex={openMG ? 4000 : 3000}
          containerStyle={{ zIndex: openMG ? 4000 : 3000 }}
          dropDownContainerStyle={{ zIndex: openMG ? 4000 : 3000 }}
        />

        <Caption>Equipment Type</Caption>
        <DropDownSelect
          items={EquipmentTypeOptions}
          value={selectedEquipmentType}
          onChange={setSelectedEquipmentType}
          placeholder={data.equipment_type}
          open={openEQ}
          setOpen={(open) => {
            setOpenEQ(open);
            if (open) {
              setOpenMG(false);
              setOpenEX(false);
            }
          }}
          zIndex={openEQ ? 3000 : 2000}
          containerStyle={{ zIndex: openEQ ? 3000 : 2000 }}
          dropDownContainerStyle={{ zIndex: openEQ ? 3000 : 2000 }}
        />

        <Caption>Exercise Type</Caption>
        <DropDownSelect
          items={ExerciseTypeOptions}
          value={selectedExerciseType}
          onChange={setSelectedExerciseType}
          placeholder={data.exercise_type}
          open={openEX}
          setOpen={(open) => {
            setOpenEX(open);
            if (open) {
              setOpenMG(false);
              setOpenEQ(false);
            }
          }}
          zIndex={openEX ? 2000 : 1000}
          containerStyle={{ zIndex: openEX ? 2000 : 1000 }}
          dropDownContainerStyle={{ zIndex: openEX ? 2000 : 1000 }}
        />
      </View>
    );
  }

  return <PageWrapper pageHeading="Edit Exercise">{body}</PageWrapper>;
}
