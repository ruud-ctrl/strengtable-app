import { useWindowDimensions, View } from "react-native";

export default function WeightChart({ data = [] }) {
  const { width } = useWindowDimensions();

  const sorted = [...data]
    .map(d => ({ x: new Date(d.created_at), y: parseFloat(d.weight) }))
    .filter(p => !Number.isNaN(p.y) && !Number.isNaN(p.x.getTime()))
    .sort((a, b) => a.x.getTime() - b.x.getTime());

  if (!sorted.length) return <View style={{ padding: 16 }} />;

  const labels = sorted.map(p =>
    new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(p.x)
  );
  const values = sorted.map(p => p.y);

  return (
    <View style={{ padding: 16 }}>

    </View>
  );
}
