import React from "react";
import { useFonts } from "expo-font";

// import { Home } from "./src/components/Home";
import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { LoginScreen } from "./src/screens/LoginScreen";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return <RegistrationScreen />;
  return <LoginScreen />;
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
