import { View } from 'react-native'
import { Chip, KeyValuePair, Panel, H2 } from '@components'
import { formatDate } from '@utils/formatDate'

const UserAccount = ({userProfile}) => {

    const statusTone = userProfile?.status === "Approved"
    ? "success"
    : "muted";

  return (
      <Panel>
        <H2>Account</H2>
        <View style={{ height: 8 }} />
        <KeyValuePair label="Firstname" value={userProfile?.firstname || "—"} />
        <KeyValuePair label="Lastname" value={userProfile?.lastname || "—"} />
        <KeyValuePair label="Email" value={userProfile?.email} />
        <KeyValuePair
          label="Role"
          value={<Chip label={userProfile?.role || "—"} tone="muted" />}
        />
        <KeyValuePair
          label="Status"
          value={<Chip label={userProfile?.status || "—"} tone={statusTone} />}
        />
        <KeyValuePair label="User ID" value={String(userProfile?.id)} after={"change me"} />
        <KeyValuePair label="Created at" value={formatDate(userProfile?.created_at)} />
        <KeyValuePair label="Approved at" value={formatDate(userProfile?.approved_at)} />
      </Panel>
  )
}

export default UserAccount