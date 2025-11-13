import PageWrapper from "@components/PageWrapper";
import Button from "@components/Button";
import { Caption, H1, H2, P, Small } from "@components/Text";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useTheme } from "@theme/useTheme";


import Panel from "@components/Panel";

export default function Home() {
  const colors = useTheme().colors;
  const navigation = useNavigation();

    const onDoWorkout = useCallback(
      (program) => {
        navigation.navigate("SingleWorkout", { id: 1 });
      },
      [navigation]
    );
  

  return (
    <PageWrapper onRefresh={() => { }}>
      <H1>Home</H1>
      <Caption>Hello there!</Caption>
      <P>Bottom tab navigator for React Navigation following iOS design guidelines.
        Installation instructions and documentation can be found</P>
      <Panel>
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
      <Button size="sm" style={{ marginLeft: "auto" }} title="Go To Exercises" onPress={() => navigation.navigate("Exercise")} />
      <Button size="sm" style={{ marginLeft: "auto" }} title="Go To Weight History" onPress={() => navigation.navigate("WeightHistory")} />
    </PageWrapper>
  );
}
