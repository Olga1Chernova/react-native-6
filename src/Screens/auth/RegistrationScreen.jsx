import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";


const InitialState = {
  login: "",
  email: "",
  password: "",
};



const RegistrationScreen = ({ navigation }) => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [state, setState] = useState(InitialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const validateInput = () => {
  if (!state.login.trim()) {
    alert("Please enter your login");
    return false;
  }
  if (!state.email.trim() || !state.email.includes("@")) {
    alert("Please enter a valid email address");
    return false;
  }
  if (state.password.trim().length < 6) {
    alert("Please enter a password with at least 6 characters");
    return false;
  }
  return true;
}

  const keyboardHide = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
    console.log(state);
    setState(InitialState);
  };


  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/img/background-img.png")}
          style={styles.image}
        >
          <View style={styles.imageWrapper}>
            <Image source={require("../../../assets/img/photoSpace.png")} />
            <Image
              style={styles.addIcon}
              source={require("../../../assets/img/add.png")}
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.register}>Registration</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  marginBottom: isKeyboardShown ? 60 : 0,
                  width: dimensions,
                }}
              >
                <TextInput
                  placeholder="Enter your login"
                  style={styles.input}
                  onFocus={() => setIsKeyboardShown(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
                <TextInput
                  placeholder="Enter your e-mail"
                  style={styles.input}
                  onFocus={() => setIsKeyboardShown(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <TextInput
                  placeholder="Enter your password"
                  style={styles.input}
                  secureTextEntry={true}
                  onFocus={() => setIsKeyboardShown(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={() => {
                    keyboardHide();
                    if (validateInput()) {
                      navigation.navigate("Home");
                    }
                }}
                >
                  <Text style={styles.buttonTitle}>Sign up</Text>
                </TouchableOpacity>
                <Text
                  style={styles.signInText}
                  onPress={() => navigation.navigate("Login")}
                >
                  Already have an account? Log in
                </Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    position: "relative",
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  imageWrapper: {
    left: "-1%",
    top: "10%",
    zIndex: 999,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  addIcon: {
    position: "absolute",
    left: "90%",
    top: "65%",
    width: 25,
    height: 25,
  },

  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    // marginHorizontal: 16,
    color: "#212121",
  },
  register: {
    marginBottom: 32,
    marginTop: 92,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  form: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FF6C00",
    color: "#FFFFFF",
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    //marginHorizontal: 16,
  },
  buttonTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  signInText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});
