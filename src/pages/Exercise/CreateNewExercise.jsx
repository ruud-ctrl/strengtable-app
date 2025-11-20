import React, { useMemo, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {PageWrapper, Caption, H1, DropDownSelect, TextField, Button } from "@components";
import { EquipmentTypeOptions, ExerciseTypeOptions, MuscleGroupOptions } from "@constants/enums";
import { useExercises } from "@hooks/useExercises";

export default function CreateNewExercise() {
  const nav = useNavigation();
  const { addExercise } = useExercises();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
  const [selectedEquipmentType, setSelectedEquipmentType] = useState(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const [openMG, setOpenMG] = useState(false);
  const [openEQ, setOpenEQ] = useState(false);
  const [openEX, setOpenEX] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      !!name.trim() &&
      !!selectedMuscleGroup &&
      !!selectedEquipmentType &&
      !!selectedExerciseType
    );
  }, [name, selectedMuscleGroup, selectedEquipmentType, selectedExerciseType]);

  const handleSubmit = async () => {
    if (!canSubmit) {
      Alert.alert("Missing info", "Please complete all fields before submitting.");
      return;
    }
    try {
      setSubmitting(true);
      const payload = {
        name: name.trim(),
        description: description.trim(),
        muscle_group: selectedMuscleGroup,
        equipment_type: selectedEquipmentType,
        exercise_type: selectedExerciseType,
      };
      await addExercise(payload);
      nav.goBack();
    } catch (e) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <H1>Create new exercise</H1>

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
        placeholder="Select a Muscle Group"
        open={openMG}
        setOpen={setOpenMG}
        zIndex={openMG ? 4000 : 3000}
        containerStyle={{ zIndex: openMG ? 4000 : 3000 }}
        dropDownContainerStyle={{ zIndex: openMG ? 4000 : 3000 }}
      />

      <Caption>Equipment Type</Caption>
      <DropDownSelect
        items={EquipmentTypeOptions}
        value={selectedEquipmentType}
        onChange={setSelectedEquipmentType}
        placeholder="Select an Equipment Type"
        open={openEQ}
        setOpen={setOpenEQ}
        zIndex={openEQ ? 3000 : 2000}
        containerStyle={{ zIndex: openEQ ? 3000 : 2000 }}
        dropDownContainerStyle={{ zIndex: openEQ ? 3000 : 2000 }}
      />

      <Caption>Exercise Type</Caption>
      <DropDownSelect
        items={ExerciseTypeOptions}
        value={selectedExerciseType}
        onChange={setSelectedExerciseType}
        placeholder="Select an Exercise Type"
        open={openEX}
        setOpen={setOpenEX}

        zIndex={openEX ? 2000 : 1000}
        containerStyle={{ zIndex: openEX ? 2000 : 1000 }}
        dropDownContainerStyle={{ zIndex: openEX ? 2000 : 1000 }}
      />

      <Button
        title={submitting ? "Submitting..." : "Submit"}
        disabled={!canSubmit || submitting}
        onPress={handleSubmit}
      />
    </PageWrapper>
  );
}
