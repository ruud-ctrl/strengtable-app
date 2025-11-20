import { View } from "react-native";
import {PageWrapper, Panel, Text, H2, H3, Small, DataWrapper, Button} from "@components";
import { useTheme } from "@theme/useTheme";
import { useWorkout } from "@hooks/useWorkout";
import LogGroup from "./LogGroup";

export default function SingleWorkout({ route }) {
  const id = route.params?.id ?? "—";
  const { workout } = useWorkout(id);
  const { colors } = useTheme();

  const createdDate = new Date(workout.created_at).toLocaleDateString();

  return (
    <PageWrapper
      title={workout?.data?.split ?? "workout"}    
      onRefresh={workout.refetch}
      refreshing={workout.isFetching}
    >
      <DataWrapper query={workout} errorMessage="Failed to load workout.">
        {(data) => (
          <Panel>
            <View style={{ marginBottom: 16 }}>
              <H2>{workout.data.split}</H2>
              <H3>{workout.data.program}</H3>
              <Small>Created: {createdDate}</Small>
              <Small>
                Status: {workout.data.workout_state}
              </Small>
            </View>

            {workout.data.notes && (
              <Panel>
                <Text marginBottom={6}>{workout.data.notes}</Text>
              </Panel>
            )}

            {workout.data.logs?.map((log, i) => (
              <LogGroup key={i} log={log} />
            ))}
            <Button
              title="Mark as Complete"
              onPress={() => console.log("Complete workout")}
            />
          </Panel>

        )}
      </DataWrapper>
    </PageWrapper>
  );
}
