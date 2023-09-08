import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ProfileScreen } from "./ProfileScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { PostsScreen } from "./PostsScreen";
import { BackBtn } from "../components/BackBtn";
import { LogoutBtn } from "../components/LogoutBtn";

export const HomeScreen = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      backBehavior="history"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "PostsScreen") {
            return (
              <View style={focused ? styles.focusedIcon : styles.icon}>
                <Feather
                  name="grid"
                  size={24}
                  color={focused ? "white" : "black"}
                />
              </View>
            );
          } else if (route.name === "CreatePostsScreen") {
            return (
              <View style={focused ? styles.focusedIcon : styles.icon}>
                <Feather
                  name="plus"
                  size={24}
                  color={focused ? "white" : "black"}
                />
              </View>
            );
          } else if (route.name === "ProfileScreen") {
            return (
              <View style={focused ? styles.focusedIcon : styles.icon}>
                <Feather
                  name="user"
                  size={24}
                  color={focused ? "white" : "black"}
                />
              </View>
            );
          }
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 75,
          paddingTop: 10,
          paddingBottom: 25,
          paddingLeft: 80,
          paddingRight: 80,
          justifyContent: "center",
          alignItems: "flex-start",
        },

        headerShown: true,
        headerStyle: {
          borderBottomWidth: 1,
        },
      })}
    >
      <Tabs.Screen
        name={"PostsScreen"}
        component={PostsScreen}
        options={{
          title: "Publications",
          headerTitleAlign: "center",
          headerRight: () => <LogoutBtn />,
          headerStyle: {
            borderBottomWidth: 1,
          },
        }}
      />
      <Tabs.Screen
        name={"CreatePostsScreen"}
        component={CreatePostsScreen}
        options={{
          title: "Create publication",
          headerTitleAlign: "center",
          headerLeft: () => <BackBtn />,
          headerStyle: {
            borderBottomWidth: 1,
          },
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name={"ProfileScreen"}
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,

    width: 40,
  },

  focusedIcon: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,

    width: 70,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
});
