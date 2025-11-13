import PageWrapper from "@components/PageWrapper";
import Panel from "@components/Panel";
import { Caption, H1, H2 } from "@components/Text";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@theme/useTheme";
import KeyValuePair from "@components/KeyValuePair";
import { usePersonal } from "@hooks/usePersonal";
import ThemeSettings from "./ThemeSettings";
import SubscribeSettings from "./SubscribeSettings";
import UnitSettings from "./UnitSettings";
import UserAccount from "./UserAccount";
import WeightPanel from "./WeightPanel";
import WeightChart from "@components/WeightChart";

export default function Profile() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { userProfile: { data: userProfile }, setTheme, setUnitType, setSubscriptionNewsletter, setNewWeight } = usePersonal();


const weights = [
  { id: 1, user_id: 1, weight: "75.50", created_at: "2025-11-01T14:47:37.210Z" },
  { id: 2, user_id: 1, weight: "40.00", created_at: "2025-11-02T17:48:03.546Z" },
];
  return (
    <PageWrapper
      headerRightIcon={"settings-outline"}
      onRefresh={() => { }}
    >
      <H1>Profile</H1>
      <Caption>Manage your account & preferences</Caption>
<WeightChart data={weights} />
      <UserAccount userProfile={userProfile} />

      <Panel style={{ marginTop: 16 }}>
        <H2>Preferences</H2>
        <View style={{ height: 8 }} />
        <ThemeSettings data={userProfile} setTheme={setTheme} />
        <SubscribeSettings data={userProfile} setSubscription={setSubscriptionNewsletter} />
        <UnitSettings data={userProfile} setUnits={setUnitType} />
      </Panel>

      <Panel style={{ marginTop: 16 }}>
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
