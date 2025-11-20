import { Text, Panel, H1, H2, H3, Small, Button } from "@components";
import { useTheme } from "@theme/useTheme";
import LogRow from '../LogRow';

const LogGroup = ({log}) => {
    const { colors } = useTheme();
    console.log(log)

    const cb = (i) => {
console.log(i)
    }
  return (
          <Panel
            key={log.exercise.id}
            style={{
              marginBottom: 20,
              padding: 12,
              borderRadius: 12,
              backgroundColor: colors.surface,
            }}
          >
            <H3 style={{ marginBottom: 4 }}>{log.exercise.name}</H3>

            <Panel>
              <Small>Last time you did 60kg x 6 reps</Small>
            </Panel>


            {log?.sets?.map((row, i) => (
              <LogRow key={i} row={row} onChange={cb} />
            ))}
      <Button
      onPress={() => console.log(log.sets[0])}
        title={"Complete Set"}
      />
          </Panel>
  )
}

export default LogGroup