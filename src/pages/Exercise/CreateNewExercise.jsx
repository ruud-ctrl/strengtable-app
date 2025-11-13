import React, { useMemo, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PageWrapper from "@components/PageWrapper";
import { Caption, H1 } from "@components/Text";
import TextField from "@components/TextField";
import DropdownSelect from "@components/Dropdown";
import { EquipmentTypeOptions, ExerciseTypeOptions, MuscleGroupOptions } from "@constants/enums";
import Button from "@components/Button";
import { useExercises } from "@hooks/useExercises";

export default function CreateNewExercise() {
  const nav = useNavigation();
  const { addExercise } = useExercises();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
  const [selectedEquipmentType, setSelectedEquipmentType] = useState(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);

  // Local loading to disable the button while creating
  const [submitting, setSubmitting] = useState(false);

  // Dropdown open states so we can bump zIndex while open
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
      // Optionally clear fields, or just navigate back
      nav.goBack();
    } catch (e) {
      // Error snackbar will already fire from the hook
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
      <DropdownSelect
        items={MuscleGroupOptions}
        value={selectedMuscleGroup}
        onChange={setSelectedMuscleGroup}
        placeholder="Select a Muscle Group"
        open={openMG}
        setOpen={setOpenMG}
        // If you use react-native-dropdown-picker:
        // listMode="MODAL" helps avoid nested list warnings inside ScrollViews
        listMode="MODAL"
        zIndex={openMG ? 4000 : 3000}
        containerStyle={{ zIndex: openMG ? 4000 : 3000 }}
        dropDownContainerStyle={{ zIndex: openMG ? 4000 : 3000 }}
      />

      <Caption>Equipment Type</Caption>
      <DropdownSelect
        items={EquipmentTypeOptions}
        value={selectedEquipmentType}
        onChange={setSelectedEquipmentType}
        placeholder="Select an Equipment Type"
        open={openEQ}
        setOpen={setOpenEQ}
        listMode="MODAL"
        zIndex={openEQ ? 3000 : 2000}
        containerStyle={{ zIndex: openEQ ? 3000 : 2000 }}
        dropDownContainerStyle={{ zIndex: openEQ ? 3000 : 2000 }}
      />

      <Caption>Exercise Type</Caption>
      <DropdownSelect
        items={ExerciseTypeOptions}
        value={selectedExerciseType}
        onChange={setSelectedExerciseType}
        placeholder="Select an Exercise Type"
        open={openEX}
        setOpen={setOpenEX}
        listMode="MODAL"
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
