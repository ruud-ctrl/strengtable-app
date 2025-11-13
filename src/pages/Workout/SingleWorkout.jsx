import { View } from "react-native";
import PageWrapper from "@components/PageWrapper";
import Panel from "@components/Panel";
import Text, { H2, H3, Small } from "@components/Text";
import { useTheme } from "@theme/useTheme";
import { useWorkout } from "@hooks/useWorkout";
import TextButton from "@components/TextButton";

export default function SingleWorkout({ route }) {
  const id = route.params?.id ?? "—";


  const { workout } = useWorkout(id);

  const { colors } = useTheme();

  if (!workout.data) {
    return (
      <PageWrapper title="Loading...">
        <Panel>
          <Text>Loading workout...</Text>
        </Panel>
      </PageWrapper>
    );
  }

  const createdDate = new Date(workout.created_at).toLocaleDateString();
  const isActive = workout.workout_state === "Active";

  return (
    <PageWrapper title={workout.data.program}>
      <Panel>
        {/* --- Workout Header --- */}
        <View style={{ marginBottom: 16 }}>
          <H2>{workout.data.program}</H2>
          <H3 style={{ color: colors.textSecondary }}>{workout.data.split}</H3>
          <Small style={{ color: colors.textSecondary }}>
            Created: {createdDate}
          </Small>
          <Small style={{ color: isActive ? colors.success : colors.error }}>
            Status: {workout.data.workout_state}
          </Small>
        </View>

        {/* --- Notes --- */}
        {workout.data.notes && (
          <View style={{ marginBottom: 16 }}>
            <Text>{workout.data.notes}</Text>
          </View>
        )}

        {/* --- Exercises --- */}
        {workout.data.logs?.map((log, index) => (
          <View
            key={log.exercise.id}
            style={{
              marginBottom: 20,
              padding: 12,
              borderRadius: 12,
              backgroundColor: colors.surface,
            }}
          >
            <H3 style={{ marginBottom: 4 }}>{log.exercise.name}</H3>
            <Small style={{ color: colors.textSecondary, marginBottom: 8 }}>
              {log.exercise.muscle_group} • {log.exercise.equipment_type}
            </Small>

            {/* --- Sets --- */}
            {log.sets.map((set) => (
              <View
                key={set.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 4,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Small>Set {set.set_number}</Small>
                <Small>
                  Target: {set.target_reps} reps
                </Small>
                <Small>
                  Done:{" "}
                  {set.performed_reps > 0
                    ? set.performed_reps
                    : "—"}
                </Small>
                <Small>
                  {set.weight_used
                    ? `${set.weight_used} kg`
                    : "No weight"}
                </Small>
              </View>
            ))}
          </View>
        ))}

        {/* --- Optional Action Button --- */}
        <TextButton
          title="Mark as Complete"
          onPress={() => console.log("Complete workout")}
          style={{
            marginTop: 12,
            alignSelf: "center",
          }}
        />
      </Panel>
    </PageWrapper>
  );
}
