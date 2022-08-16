import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Screen from "../../helpers/Screen";
import haptic from "../../helpers/Haptics";

const StampCard = (stampcard) => {
  // Navigation
  navigation = stampcard.navigation;

  // Firebase
  const database = getFirestore();
  const docRef = doc(database, "stampcard", stampcard.id);

  // View Builder stuff
  const stampcardID = stampcard.id;
  const stampcardData = stampcard.data;
  const [stampCardInfo, setStampCardInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [backsideShowing, setBacksideShowing] = useState(false);
  var upperStamps = [];
  var lowerStamps = [];

  // Functions
  const fetchStampCardInfos = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setStampCardInfo(docSnap.data());
      setIsLoading(false);
    } else {
      console.log("No such document!");
    }
  };

  const toggleStampcardInfo = () => {
    setBacksideShowing(!backsideShowing);
  };

  // Checks everytime app opens
  useEffect(() => {
    fetchStampCardInfos();
  }, []);

  //stampcard stamps
  if (stampCardInfo) {
    for (let i = 0; i < 5; i++) {
      if (i < stampcardData.value) {
        upperStamps.push(
          <View key={i} style={{ height: 40, width: 40 }}>
            <Image
              source={require("../../assets/icons/stampback.png")}
              resizeMode="contain"
              style={{ height: 40, width: 40, tintColor: stampCardInfo.color }}
            />
            <Image
              source={require("../../assets/icons/stamp.png")}
              resizeMode="contain"
              style={{ height: 40, width: 40, position: "absolute", zIndex: 1 }}
            />
          </View>
        );
      } else {
        upperStamps.push(
          <Image
            key={i}
            source={require("../../assets/icons/emptystamp.png")}
            resizeMode="contain"
            style={{ height: 40, width: 40 }}
          />
        );
      }
    }

    for (let i = 5; i < 10; i++) {
      if (i < stampcardData.value) {
        lowerStamps.push(
          <View key={i} style={{ height: 40, width: 40 }}>
            <Image
              source={require("../../assets/icons/stampback.png")}
              resizeMode="contain"
              style={{
                height: 40,
                width: 40,
                tintColor: stampCardInfo.color,
                position: "absolute",
                zIndex: 0,
              }}
            />
            <Image
              source={require("../../assets/icons/stamp.png")}
              resizeMode="contain"
              style={{ height: 40, width: 40, position: "absolute", zIndex: 1 }}
            />
          </View>
        );
      } else {
        lowerStamps.push(
          <Image
            key={i}
            source={require("../../assets/icons/emptystamp.png")}
            resizeMode="contain"
            style={{ height: 40, width: 40 }}
          />
        );
      }
    }
  }

  return (
    <View style={styles.shadow}>
      {/* Card is Loading View */}
      {isLoading && (
        <View
          style={{
            width: Screen.width / 1.1,
            height: Screen.width / 1.7,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
            backgroundColor: "rgba(33, 33, 33, 0.3)",
            borderRadius: 15,
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              width: Screen.width / 2.5,
              height: Screen.width / 4,
              opacity: 0.4,
            }}
            source={require("../../assets/stampitlogo.png")}
          />
          <ActivityIndicator color={"#fff"} />
        </View>
      )}
      {/* Normal Stampcard */}
      {!isLoading && stampCardInfo && !stampcardData.isFull && (
        <ImageBackground
          source={{ uri: stampCardInfo.image }}
          resizeMode="cover"
          borderRadius={15}
          style={styles.stampCardView}
        >
          <TouchableOpacity
            style={styles.stampCardViewDetails}
            activeOpacity={0.9}
            //handle press to go to seller details
            onPress={() => {
              haptic("normal");
              navigation.push("Seller Details", stampCardInfo.sellerID);
            }}
          >
            {/* Seller Favicon, adress and info button */}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 20,
                paddingLeft: 12.5,
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: stampCardInfo.favicon }}
                  resizeMode="cover"
                  style={{ width: 46, height: 46, borderRadius: 5 }}
                />
                <View style={{ justifyContent: "center", marginLeft: 10 }}>
                  <Text>{stampCardInfo.name}</Text>
                  <Text style={{ fontSize: 10, marginTop: 1.5 }}>
                    {stampCardInfo.adress}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={toggleStampcardInfo}
                style={{
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 23,
                  height: 23,
                  borderColor: stampCardInfo.color,
                  borderWidth: 2,
                  borderRadius: 45,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: stampCardInfo.color,
                  }}
                >
                  i
                </Text>
              </TouchableOpacity>
            </View>
            {/* if Stamps showing */}
            {!backsideShowing && (
              <View style={{ marginTop: 5, paddingHorizontal: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    height: 50,
                    width: "100%",
                    justifyContent: "space-evenly",
                    marginTop: 5,
                  }}
                >
                  {upperStamps}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    height: 50,
                    width: "100%",
                    justifyContent: "space-evenly",
                  }}
                >
                  {lowerStamps}
                </View>
              </View>
            )}
            {/* if info showing */}
            {backsideShowing && (
              <View
                style={{ marginTop: 5, alignItems: "flex-start", width: "90%" }}
              >
                <Text style={{ color: "#3a3a3a", fontSize: 13 }}>
                  Deals werden nach Level deiner Karte vergeben:
                </Text>
                <Text style={{ color: "#3a3a3a", fontSize: 13, marginTop: 3 }}>
                  Level 1 = Wert bis 10€
                </Text>
                <Text style={{ color: "#3a3a3a", fontSize: 13, marginTop: 3 }}>
                  Level 2 = Wert bis 15€
                </Text>
                <Text style={{ color: "#3a3a3a", fontSize: 13, marginTop: 3 }}>
                  Level 3 = Wert bis 20€
                </Text>
                <Text style={{ color: "#3a3a3a", fontSize: 13, marginTop: 3 }}>
                  Du erhältst mid. 1-3 Stempel pro Dienstleistung
                </Text>
              </View>
            )}
            {/* Level Indicator */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                width: 21,
                height: 22,
                position: "absolute",
                left: 18,
                bottom: -5,
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={require("../../assets/icons/levelindicatorfront.png")}
                  resizeMode="stretch"
                  style={{
                    width: 16,
                    height: 22,
                    tintColor: stampCardInfo.color,
                  }}
                />
                <Text
                  style={{
                    position: "absolute",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  {stampcardData.level}
                </Text>
              </View>
              <View>
                <Image
                  source={require("../../assets/icons/levelindicatorback.png")}
                  resizeMode="stretch"
                  style={{ width: 4, height: 5, tintColor: "#000" }}
                />
                <Image
                  source={require("../../assets/icons/levelindicatorback.png")}
                  resizeMode="stretch"
                  style={{
                    width: 4,
                    height: 5,
                    position: "absolute",
                    tintColor: `${stampCardInfo.color}90`,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      )}
      {/* Full Card choose Deal View */}
      {!isLoading && stampCardInfo && stampcardData.isFull && (
        <View
          style={[
            styles.fullCardView,
            { backgroundColor: stampCardInfo.color, borderRadius: 15 },
          ]}
        >
          {/* Simple seller info with open or closed */}
          <View
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              height: Screen.width / 6,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: stampCardInfo.favicon }}
              resizeMode="cover"
              style={{
                width: 45,
                height: 45,
                borderRadius: 5,
                marginRight: 15,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#4a4a4a",
                marginRight: 5,
              }}
            >
              {stampCardInfo.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "300",
                color: "#4a4a4a",
                marginRight: 5,
                bottom: 1,
              }}
            >
              |
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: stampCardInfo.color,
                marginRight: 15,
                bottom: 1,
              }}
            >
              geöffnet
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(1000, 1000, 1000, 0.85)",
              borderBottomRightRadius: 15,
              borderBottomLeftRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/dealcardschmuck.png")}
              resizeMode="stretch"
              style={{ width: "95%", height: "90%" }}
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                height: "85%",
                position: "absolute",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#DF2839",
                }}
              >
                Herzlichen Glückwunsch!
              </Text>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "#4a4a4a",
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  Deine Karte ist voll
                </Text>
                <Text
                  style={{
                    color: "#4a4a4a",
                    fontSize: 15,
                    fontWeight: "500",
                    marginTop: 3,
                  }}
                >
                  Möchtest du deinen Deal einlösen?
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  stampcard.getSeller({
                    stampcardID,
                    stampCardInfo,
                    stampcardData,
                  });
                  haptic("normal");
                }}
                style={{
                  backgroundColor: stampCardInfo.color,
                  width: Screen.width / 2,
                  height: 45,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 50,
                }}
              >
                <Image
                  source={require("../../assets/icons/gift.png")}
                  resizeMode="contain"
                  style={{ width: 22, height: 23 }}
                />
                <Text
                  style={{
                    marginHorizontal: 5,
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  Deal einlösen
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stampCardView: {
    width: Screen.width / 1.1,
    height: Screen.width / 1.7,
    justifyContent: "flex-end",
    marginBottom: 15,
  },

  stampCardBackView: {
    width: Screen.width / 1.1,
    height: Screen.width / 1.7,
    marginBottom: 15,
  },

  fullCardView: {
    width: Screen.width / 1.1,
    height: Screen.width / 1.7,
    marginBottom: 15,
  },

  shadow: {
    shadowColor: "#00000050",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 50,
  },

  stampCardViewDetails: {
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    backgroundColor: "rgba(1000, 1000, 1000, 0.97)",
    height: "75%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default StampCard;
