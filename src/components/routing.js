import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import Home from "../Screens/mainScreen/Home";

const { Navigator, Screen } = createStackNavigator();

export const useRoute = (isAuth) => {

  if (!isAuth) {
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name="Registration"
          component={RegistrationScreen}
        />
        <Screen
          name="Login"
          component={LoginScreen}
        />
      </Navigator>
    )
  }
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="Home"
        component={Home}
      />
    </Navigator>
  )
};