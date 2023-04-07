import PostsScreen from "./PostsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Home = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
        },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color="rgba(33,33,33, 0.8)" />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign
              name="plus"
              size={24}
              color="#ffffff"
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <FontAwesome name="user-o" size={24} color="rgba(33,33,33, 0.8)" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    borderRadius: 20,
    textAlign: "center",
    paddingTop: 8,
  },
});
