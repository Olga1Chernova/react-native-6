import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { View } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import AuthStack from './src/components/AuthStack';

export default function App() {

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <View style={{flex:1}} onLayout={onLayoutRootView}>
        <AuthStack />
      </View>
    </NavigationContainer>
  );
}


