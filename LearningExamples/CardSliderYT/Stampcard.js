import { View, Text, Image } from "react-native";

export default function Stampcard({ title, color, favicon }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        width: 350,
        backgroundColor: color,
        borderRadius: "20%",
        position: "absolute",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>
      <Image source={favicon} resizeMode={"contain"} />
    </View>
  );
}
