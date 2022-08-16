import { View, Text } from "react-native";

export default function Stampcard({ title, color }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        width: 350,
        backgroundColor: color,
        borderRadius: "20%",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>
    </View>
  );
}
