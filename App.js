import React from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Home } from "./components/Home";

const bckGround = require("./assets/imgs/BG.jpg");

const App = () => {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={bckGround}
        resizeMode="cover"
        style={styles.image}
      >
        <Home>
          <Text style={styles.text}>
            <ActivityIndicator size="large" color="#00ff00" />
          </Text>
        </Home>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    color: "white",
    width: "100%",
    fontFamily: "Roboto",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

export default App;
