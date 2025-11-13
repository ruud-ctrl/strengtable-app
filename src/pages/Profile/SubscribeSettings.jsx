import BottomSheet from '@components/BottomSheet'
import DropdownSelect from '@components/Dropdown'
import KeyValuePair from '@components/KeyValuePair'
import { useRef, useState } from 'react'
import { Text, View } from 'react-native'

const SubscribeSettings = ({ data, setSubscription }) => {
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const subscriptionSheetRef = useRef(null);

  const onChangeSubscription = async (newState) => {
    setSelectedSubscription(newState);
    await setSubscription({ value: newState });
    subscriptionSheetRef.current?.close();
  };

  return (
    <>
      <KeyValuePair label="Newsletter" value={data?.newsletter_subscribed ? "Subscribed" : "Not subscribed"} onPress={() => subscriptionSheetRef.current?.open()} />
      <BottomSheet
        ref={subscriptionSheetRef}
        modalHeight={380}
        modalStyle={{
          backgroundColor: "#101214",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
        contentContainerStyle={{ gap: 12 }}
        HeaderComponent={
          <View style={{ padding: 16 }}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
              Set Subscription Newsletter
            </Text>
          </View>
        }
      >
        <DropdownSelect
          items={[{ label: "Subscribe", value: true }, { label: "Unsubscribe", value: false }]}
          value={selectedSubscription}
          onChange={onChangeSubscription}
          placeholder="Set Subscription newsletter"

        />
      </BottomSheet>
    </>
  )
}

export default SubscribeSettings