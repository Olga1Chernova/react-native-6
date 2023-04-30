import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import Home from "../Screens/mainScreen/Home";

import CreatePostsScreen from "../Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "../Screens/mainScreen/ProfileScreen"

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {

  if (!isAuth) {
    return (
       <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <AuthStack.Screen name="Registration" component={RegistrationScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    )
  }
  return (
     <MainTab.Navigator
      initialRouteName="Home"
      activeColor="#FF6C00"
      screenOptions={{
        tabBarStyle: {
          height: 83,
          paddingHorizontal: 81,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 17,
          fontFamily: 'Roboto-Medium',
          lineHeight: 22,
          color: '#212121',
        },
      }}
    >
      <MainTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="grid-outline"
              size={24}
              color={!focused ? '#212121' : '#FF6C00'}
            />
          ),
          tabBarShowLabel: false,
          headerRight: () => (
            <Ionicons
              name="log-in-outline"
              size={30}
              color="#BDBDBD"
              style={{ marginRight: 10 }}
            />
          ),
          headerStyle: {
            borderBottomWidth: 1,
          },
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="add-circle-sharp"
              size={30}
              color={!focused ? '#212121' : '#FF6C00'}
            />
          ),
          tabBarShowLabel: false,
          headerTitle: 'Створити публікацію',
          headerStyle: {
            borderBottomWidth: 1,
          },
        }}
      />
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={!focused ? '#212121' : '#FF6C00'}
            />
          ),
          tabBarShowLabel: false,
          headerStyle: {
            borderBottomWidth: 1,
          },
          headerTitle: 'Профіль',
        }}
      />
    </MainTab.Navigator>
  )
};