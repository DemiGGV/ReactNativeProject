import React from "react";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "./src/screens/HomeScreen";
import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { CommentsScreen } from "./src/screens/CommentsScreen";
import { MapScreen } from "./src/screens/MapScreen";
import { BackBtn } from "./src/components/BackBtn";

const Nav = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Nav.Navigator initialRouteName="LoginScreen">
        <Nav.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Nav.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Nav.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Nav.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={{
            title: "Comments",
            headerShown: true,
            headerLeft: () => <BackBtn />,
            headerStyle: {
              borderBottomWidth: 1,
            },
          }}
        />
        <Nav.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            title: "Location",
            headerShown: true,
            headerLeft: () => <BackBtn />,
            headerStyle: {
              borderBottomWidth: 1,
            },
          }}
        />
      </Nav.Navigator>
    </NavigationContainer>
  );
};

export default App;

// Icons

// import { Feather } from '@expo/vector-icons';

//<Feather name="plus-circle" size={24} color="black" />
//<Feather name="x-circle" size={24} color="black" />
//<Feather name="arrow-left" size={24} color="black" />
//<Feather name="trash" size={24} color="black" />
//<Feather name="plus" size={24} color="black" />
//<Feather name="camera" size={24} color="black" />
//<Feather name="arrow-up-circle" size={24} color="black" />
//<Feather name="thumbs-up" size={24} color="black" />
//<Feather name="message-circle" size={24} color="black" />
//<Feather name="user" size={24} color="black" />
//<Feather name="map-pin" size={24} color="black" />
//<Feather name="grid" size={24} color="black" />
//<Feather name="log-out" size={24} color="black" />
