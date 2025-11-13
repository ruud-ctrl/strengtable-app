import { useState } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PageWrapper from "@components/PageWrapper";
import { H1, P, Small } from "@components/Text";
import TextField from "@components/TextField";
import Button from "@components/Button";
import Panel from "@components/Panel";

const BASE_URL =
  Platform.select({
    ios: "http://localhost:5001",
    android: "http://10.0.2.2:5001", // Android emulator -> host machine
    default: "http://localhost:5001",
  }) ?? "http://localhost:5001";

export default function CreateNewProgram() {
  const [name, setName] = useState("My New Program");
  const [description, setDescription] = useState("Push Pull Legs Split");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <PageWrapper>
      <H1>Create new program</H1>

      <P>Program Name</P>
      <TextField
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Panel>

            <Button
                title="Exercises"
                fullWidth
                variant="outline"
                onPress={() => navigation.navigate("Exercise")}
            />
      </Panel>

      <Button
        title="Add Split"

        onPress={() => navigation.navigate("HomeDetails", { id: "42" })}
      />

    </PageWrapper>
  );
}
