import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import PostsScreen from "../nestedScreens/PostsScreen";

import { StyleSheet } from "react-native";


const NestedScreen = createNativeStackNavigator();

const Home = () => {
  return (
    <NestedScreen.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 83,
          paddingHorizontal: 81,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 17,
          fontFamily: "Roboto-Medium",
          lineHeight: 22,
          color: "#212121",
        },
      }}
    >
      <NestedScreen.Screen
        options={{
          headerTitle: "Публікації",
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <NestedScreen.Screen
        options={{
          headerTitle: "Коментарі",
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        options={{
          headerTitle: "Мапа",
        }}
        name="MapScreen"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
 
});
