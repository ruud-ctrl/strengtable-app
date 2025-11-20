import { Caption, H2, P, Small, Panel, Button, PageWrapper } from "@components";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useTheme } from "@theme/useTheme";
import { useErrorSnackbar } from "@hooks/useSnackbar";

export default function Home() {
  const colors = useTheme().colors;
  const navigation = useNavigation();
  const showError = useErrorSnackbar();

  const onDoWorkout = useCallback(
    (program) => {
      navigation.navigate("SingleWorkout", { id: 1 });
    },
    [navigation]
  );

  return (
    <PageWrapper onRefresh={() => { console.log("hoi") }} pageHeading={"Home"}>
      <Caption>Hello there!</Caption>
      <P>Bottom tab navigator for React Navigation following iOS design guidelines.
        Installation instructions and documentation can be found</P>
      <Panel>
        <Button title="Test" onPress={() => showError("Oops")} />
        <View flexDirection={"row"}>
          <View>
            <H2>Next Workout</H2>
            <Caption>Hello there!</Caption>
          </View>
          <Button size="sm" style={{ marginLeft: "auto" }} title="Do Workout" onPress={onDoWorkout} />
        </View>
        <Small>Bottom tab navigator for React Navigation following iOS design guidelines.
          Installation instructions and documentation can be found</Small>
      </Panel>
      <Button size="sm" style={{ marginLeft: "auto" }} title="Go To Exercises" onPress={() => navigation.navigate("Exercises")} />
      <Button size="sm" style={{ marginLeft: "auto" }} title="Go To Weight History" onPress={() => navigation.navigate("WeightHistory")} />
    </PageWrapper>
  );
}
