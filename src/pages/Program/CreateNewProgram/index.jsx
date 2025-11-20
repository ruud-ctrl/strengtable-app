import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {PageWrapper, H1, P, TextField, Button, Panel } from "@components";

export default function CreateNewProgram() {
  const [name, setName] = useState("My New Program");
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
