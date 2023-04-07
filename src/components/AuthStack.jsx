import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "../../src/Screens/auth/RegistrationScreen";
import LoginScreen from "../../src/Screens/auth/LoginScreen";
import Home from "../../src/Screens/mainScreen/Home";

const { Navigator, Screen } = createStackNavigator();

const AuthStack = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen
      name="Registration"
      component={RegistrationScreen}
    />
    <Screen
      name="Login"
      component={LoginScreen}
    />
    <Screen
      name="Home"
      component={Home}
    />
  </Navigator>
);
export default AuthStack;
