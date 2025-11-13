// SingleProgram.tsx
import React from "react";
import { View } from "react-native";
import PageWrapper from "@components/PageWrapper";
import Panel from "@components/Panel";
import Text, { Caption, H2, H3, P, Small } from "@components/Text";
import { useTheme } from "@theme/useTheme";
import { useProgram } from "@hooks/useProgram";
import { usePersonal } from "@hooks/usePersonal";
import TextButton from "@components/TextButton";

export default function SingleExercise({ route }) {
  const id = route.params?.id ?? "—";
  const { program: { data: program } } = useProgram(id);
  const { userProfile: { data: userProfile }, setActiveProgram } = usePersonal();
  const { colors } = useTheme();

  const setActive = async (programId) => {
    try {
      await setActiveProgram({ programId });
    } catch (e) {
      console.warn("Failed to set active program", e);
    }
  };

  const isActive = id === userProfile?.active_program;

  return (
    <PageWrapper title={program?.name ?? "SingleProgram"}>
      <Panel>
        <H2>{program?.name}</H2>
        {program?.description ? (
          <Text style={{ color: colors.contrast[300], marginTop: 4 }}>
            {program?.description}
          </Text>
        ) : null}

        <View style={{ flexDirection: "row", gap: 12, marginTop: 8, alignItems: "center" }}>
          <Text style={{ color: colors.contrast[300] }}>
            ID: <Text style={{ color: colors.contrast[100] }}>{id}</Text>
          </Text>

          <Text style={{ color: colors.contrast[300] }}>
            Status:{" "}
            <Text style={{ color: isActive ? "#22c55e" : "#ef4444" }}>
              {isActive ? "Active" : "Inactive"}
            </Text>
          </Text>

          {!isActive && (
            <TextButton
              title="Set Active"
              rightIcon="star-outline"
              underline
              onPress={() => setActive(id)}
            />
          )}
        </View>
      </Panel>

      {program?.splits?.map((split) => (
        <Panel key={split.id}>
          <View style={{ marginBottom: 8 }}>
            <H3>{split.name}</H3>
          </View>

          <View>
            {split.exercises
              .sort((a, b) => a.order - b.order)
              .map((ex) => (
                <View
                  key={ex.id}
                  style={{
                    paddingVertical: 1,
                    borderTopWidth: 1,
                    borderTopColor: colors.base[200],
                  }}
                >
                  <P>
                    {ex.exercise_name} - {ex.exercise_muscle_group} • {ex.exercise_equipment_type}
                  </P>
                  <Small>
                    {ex.sets} sets × {ex.reps} reps
                  </Small>
                  {ex.exercise_description ? (
                    <Caption>{ex.exercise_description}</Caption>
                  ) : null}
                </View>
              ))}
          </View>
        </Panel>
      ))}
    </PageWrapper>
  );
}
