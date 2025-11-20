import { View } from "react-native";
import { Caption, H3, P, Small, Panel } from "@components";
import { useTheme } from "@theme/useTheme";

const SplitPanel = ({split}) => {
    const { colors } = useTheme();
  return (
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
  )
}

export default SplitPanel