import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RootSiblingParent } from "react-native-root-siblings";

import { HomeScreen } from "./src/screens/HomeScreen";
import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { CommentsScreen } from "./src/screens/CommentsScreen";
import { MapScreen } from "./src/screens/MapScreen";
import { BackBtn } from "./src/components/BackBtn";
import { persistor, store } from "./src/redux/store";
import { Loader } from "./src/components/Loader";
import { auth } from "./config";

const Nav = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return <Loader />;
  }
  const userAuth = auth.currentUser;

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <RootSiblingParent>
          <NavigationContainer>
            <Nav.Navigator
              initialRouteName={userAuth ? "HomeScreen" : "LoginScreen"}
            >
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
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};

export default App;
