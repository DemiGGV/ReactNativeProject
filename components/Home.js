import React from "react";
import { StyleSheet, View } from "react-native";

export const Home = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 812,
    width: 375,
    justifyContent: "center",
    alignItems: "center",
  },
});
