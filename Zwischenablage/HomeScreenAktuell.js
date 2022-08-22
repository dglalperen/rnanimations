import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
// Firebase Stuff
import { auth } from "../firebase";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
// Navigation
import { useNavigation } from "@react-navigation/native";
// Screens
import Screen, { safeArea } from "../helpers/Screen";
import StampCard from "./viewModels/StampCard";
import DealsView from "./DealsView";
import SwipeableViewStack from "../helpers/CardSliderBuild";
import haptic from "../helpers/Haptics";

// Helpers

const HomeScreen = () => {
  //Navigation
  const navigation = useNavigation();

  //Firebase
  const userID = auth.currentUser.uid;
  const database = getFirestore();

  //Bilder Assets
  const image = require("../assets/theme/themeview.png");
  const logo = require("../assets/stampitlogo.png");

  // State Variables
  const [userStampCardData, setUserStampCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [showDeals, setShowDeals] = useState(false);
  const [seller, setSeller] = useState("");
  const [snapshotErr, setSnapshotErr] = useState(null);
  const [userStampcardInfo, setUserStampcardInfo] = useState([]);
  const [stampcardData, setStampcardData] = useState([]);

  useEffect(() => {
    console.log("fetching stampcards...");
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      collection(database, "user", userID, "stampcards"),
      (snapshot) => {
        if (snapshot.docs.length > 0) {
          setUserStampcardInfo(snapshot.docs.map((doc) => doc));
          setIsLoading(false);
          console.log("fertig mit fetchen");
          fetchStampcardData();
        }
      },
      (error) => {
        console.log("Error fetching stampcard data: " + error.message);
        setSnapshotErr(error.message);
      }
    );

    const fetchStampcardData = async () => {
      console.log("fetche stampcard data");
      const stampcardDataArr = [];
      for (let i = 0; i < userStampcardInfo.length; i++) {
        const data = await getDoc(
          doc(database, "stampcard", userStampcardInfo[i].id)
        );
        stampcardDataArr.push(data.data());
      }
      setStampcardData(stampcardDataArr);
      console.log("fertig mit stampcard data fetchen");
    };
    //fetchStampcardData();

    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    if (stampcardData.length > 0) {
      setUserStampCardData(
        concatStampcardData(userStampcardInfo, stampcardData)
      );
    }
  }, []);

  const concatStampcardData = (arrA, arrB) => {
    const finalArr = [];
    if (arrA.length === arrB.length) {
      for (let i = 0; i < arrA.length; i++) {
        let obj = { ...arrA[i], ...arrB[i] };

        finalArr.push(obj);
      }
    }

    return finalArr;
  };

  const toggleShowDeals = () => {
    setShowDeals(!showDeals);
  };

  const getSeller = (seller) => {
    setShowDeals(!showDeals);
    setSeller(seller);
  };

  return (
    <SafeAreaView
      style={[safeArea.AndroidSafeArea, { backgroundColor: "#FDF8F2" }]}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeals}
        presentationStyle={"overFullScreen"}
        onRequestClose={() => {
          setShowDeals(false);
        }}
      >
        <DealsView seller={seller} toggleShowDeals={toggleShowDeals} />
      </Modal>
      <View style={styles.firstLayer}>
        <Image source={logo} resizeMode="contain" style={styles.logo} />
        <Image
          source={image}
          resizeMode="stretch"
          style={styles.backgroundImage}
        />
      </View>
      <View style={styles.cardView}>
        {/* Stempelkarten werden geladen */}
        {!userStampCardData.length === 0 && (
          <ActivityIndicator color={"#f00"} />
        )}
        {/* User hat keine Stempelkarten */}
        {!isLoading && userStampcardInfo.length === 0 && (
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#DF2839", fontSize: 16, fontWeight: "500" }}>
              Fang jetzt an zu Sammeln!
            </Text>
            <Image
              source={require("../assets/images/nocards.png")}
              resizeMode="contain"
              style={{ width: Screen.width / 1.1, height: Screen.width }}
            />
            <Text style={{ color: "#DF2839", fontSize: 16, fontWeight: "500" }}>
              Drücke auf Entdecken
            </Text>
            <Text style={{ color: "#DF2839", fontSize: 16, fontWeight: "500" }}>
              um unsere Standorte anzusehen!
            </Text>
          </View>
        )}
        {/* User hat Stempelkarten */}
        {userStampCardData.length > 0 && (
          <View style={{ alignItems: "center" }}>
            {userStampCardData.map((stampcard) => {
              return (
                <View key={stampcard.id}>
                  <Text>{stampcard.id}</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  firstLayer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardView: {
    height: "100%",
    width: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  cardScroller: {
    width: Screen.width,
    top: Screen.height / 6.5,
    alignContent: "center",
  },

  cardContainer: {
    alignItems: "center",
    marginTop: 10,
  },

  logo: {
    width: Screen.width / 2.5,
    height: Screen.width / 6,
  },

  backgroundImage: {
    width: Screen.width,
    height: Screen.width / 4,
    bottom: 0,
  },
});

// {userStampCardData && !snapshotErr && !isLoading && (
//   <SwipeableViewStack
//     data={userStampCardData}
//     renderItem={(stampcard) => (
//       <StampCard
//         getSeller={getSeller}
//         key={stampcard.id}
//         id={stampcard.id}
//         data={stampcard}
//         navigation={navigation}
//       />
//     )}
//   />
//   <ScrollView
//     showsVerticalScrollIndicator={false}
//     style={styles.cardScroller}
//   >
//     <View style={styles.cardContainer}>
//       {/* Map for the stampcards */}
//       {userStampCardData.map((stampcard) => {
//         return (
//           <StampCard
//             getSeller={getSeller}
//             key={stampcard.id}
//             id={stampcard.id}
//             data={stampcard.data()}
//             navigation={navigation}
//           />
//         );
//       })}
//     </View>
//     <View style={{ height: 300 }}></View>
//   </ScrollView>
// )}
