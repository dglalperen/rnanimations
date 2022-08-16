import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
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

  // Optimized User Data fetching
  // useEffect(() => {
  //   console.log("listening for changes in user stampcards data...");
  //   const unsubscribe = onSnapshot(
  //     collection(database, "user", userID, "stampcards"),
  //     (snapshot) => {
  //       if (snapshot.docs.length > 0) {
  //         setUserStampCardData(
  //           snapshot.docs.map((docElem) => {
  //             var finalStampcard = {};
  //             const docSnap = getDoc(
  //               doc(database, "stampcard", docElem.id)
  //             ).then((data) => {
  //               if (data.data()) {
  //                 finalStampcard = {
  //                   id: docElem.id,
  //                   ...docElem.data(),
  //                   ...data.data(),
  //                 };

  //                 Object.assign(finalStampcard, docElem.id, data.data());

  //                 return finalStampcard;
  //               } else {
  //                 console.log("missing doc");
  //               }
  //             });
  //             return finalStampcard;
  //           })
  //         );

  //         setIsLoading(false);
  //       }
  //     },
  //     (error) => {
  //       console.log("Error fetching stampcard data: " + error.message);
  //       setSnapshotErr(error.message);
  //     }
  //   );
  // }, []);

  useEffect(() => {
    console.log("fetching stampcards...");

    setIsLoading(true);
    const unsubscribe = onSnapshot(
      collection(database, "user", userID, "stampcards"),
      (snapshot) => {
        if (snapshot.docs.length > 0) {
          setUserStampcardInfo(snapshot.docs.map((doc) => doc));

          setIsLoading(false);
        }
      },
      (error) => {
        console.log("Error fetching stampcard data: " + error.message);
        setSnapshotErr(error.message);
      }
    );

    const fetchStampcardData = async () => {
      if (userStampcardInfo.length > 1) {
        const stampcardDataArr = [];
        for (let i = 0; i < userStampcardInfo.length; i++) {
          const data = await getDoc(
            database,
            "stampcard",
            userStampcardInfo[i].id
          );
          console.log("Hey: ");
          console.log(data);
          stampcardDataArr.push(data);
        }
        setStampcardData(stampcardDataArr);
      }
    };
    fetchStampcardData();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (stampcardData !== null) {
      stampcardData.forEach((cardData) => {
        console.log(cardData.id);
      });
    }
  }, [stampcardData]);

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
        {isLoading && !userStampcardInfo && <ActivityIndicator />}
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
        {userStampcardInfo.length > 1 && (
          <View style={{ alignItems: "center" }}>
            {userStampcardInfo.map((stampcard) => {
              return (
                <View
                  key={stampcard.data().inPropertySince}
                  id={stampcard.data().inPropertySince}
                >
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
