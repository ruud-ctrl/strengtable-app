import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyValuePair, H1, H2, Panel, PageWrapper } from "@components";
import { useTheme } from "@theme/useTheme";
import { usePersonal } from "@hooks/usePersonal";
import ThemeSettings from "./ThemeSettings";
import SubscribeSettings from "./SubscribeSettings";
import UnitSettings from "./UnitSettings";
import UserAccount from "./UserAccount";
import WeightPanel from "./WeightPanel";

export default function Profile() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { userProfile: { data: userProfile }, setTheme, setUnitType, setSubscriptionNewsletter, setNewWeight } = usePersonal();

  return (
    <PageWrapper
      headerRightIcon={"settings-outline"}
      onRefresh={() => { }}
    >
      <H1 style={{ color: colors.text, marginBottom: 12 }}>Profile</H1>
      <UserAccount userProfile={userProfile} />

      <Panel>
        <H2>Preferences</H2>
        <View style={{ height: 8 }} />
        <ThemeSettings data={userProfile} setTheme={setTheme} />
        <SubscribeSettings data={userProfile} setSubscription={setSubscriptionNewsletter} />
        <UnitSettings data={userProfile} setUnits={setUnitType} />
      </Panel>

      <Panel>
        <H2>Activity</H2>
        <View style={{ height: 8 }} />
        <KeyValuePair label="Active program" value={userProfile?.active_program ?? "—"} />
        <KeyValuePair label="Active workout" value={userProfile?.active_workout ?? "—"} />
      </Panel>

      <WeightPanel userProfile={userProfile} setWeight={setNewWeight} />

    </PageWrapper>
  );
}







{/* Activity / current */ }


{/* Weight card */ }
