import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Platform } from "react-native";
import * as Location from "expo-location";
import { storage, db } from "../../../firebase/config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import PostsScreen from "./PostsScreen";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isFocus, setIsFocus] = useState({
    title: false,
    locationName: false,
  });

   const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        if (Platform.OS === "ios") {
          setCamera(
            await Camera.getCameraAsync({ type: Camera.Constants.Type.back })
          );
        } else {
          const { available } = await Camera.getCameraPermissionsAsync();
          if (available) {
            setCamera(
              await Camera.getCameraAsync({ type: Camera.Constants.Type.back })
            );
          } else {
            console.log("Camera permission not granted");
          }
        }
      } else {
        console.log("Camera permission not granted");
      }
    })();
  }, []);

  const uploadPost = async () => {
    const photo = await uploadPhoto();
    const post = {
      photo,
      title,
      locationName,
      userId,
      login,
    };

    if (location?.coords) {
      post.location = location.coords;
      console.log(post.location);
    }

    const createPost = await addDoc(collection(db, "posts"), post);
  };
  
  const uploadPhoto = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();

      const id = Date.now().toString();
      const storageRef = ref(storage, `postImage/${id}`);
      await uploadBytes(storageRef, file);
      const processedPhoto = await getDownloadURL(storageRef);
      console.log("processedPhoto", processedPhoto);
      return processedPhoto;
    } catch (error) {
      console.log("error", error.message);
    }
  }

  const sendPost = () => {
    uploadPost();
    navigation.navigate("Posts");
  };

  const takePhoto = async () => {
    if (camera && camera.takePictureAsync) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  const keyboardHide = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const reset = () => {
    setTitle(""), setLocationName("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.post}>Create Posts</Text>
      <View style={styles.camera_container}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ width: 343, height: 240 }}
              />
            </View>
          )}
          <TouchableOpacity style={styles.camera_btn} onPress={takePhoto}>
            <EvilIcons
              name="camera"
              size={24}
              color="#BDBDBD"
              style={styles.camera_icon}
            />
          </TouchableOpacity>
        </Camera>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
        <View style={styles.input_wrapper}>
          <TextInput
            placeholder="Enter post name"
            style={styles.input}
            value={title}
            onFocus={() => {
              setIsKeyboardShown(true);
              setIsFocus({ ...isFocus, title: true });
            }}
            onBlur={() => {
              setIsKeyboardShown(false);
              Keyboard.dismiss();
              setIsFocus({ ...isFocus, title: false });
            }}
            onChangeText={(value) => {
              setTitle(value);
            }}
          />
        </View>
        <View style={styles.input_wrapper}>
          <TextInput
            placeholder="Enter post location"
            style={styles.input}
            value={locationName}
            onFocus={() => {
              setIsKeyboardShown(true);
              setIsFocus({ ...isFocus, locationName: true });
            }}
            onBlur={() => {
              setIsKeyboardShown(false);
              Keyboard.dismiss();
              setIsFocus({ ...isFocus, locationName: false });
            }}
            onChangeText={(value) => setLocationName(value)}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            keyboardHide();
            reset();
            sendPost();
          }}
        >
          <Text style={styles.post_btn}>Post</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  post: {
    fontFamily: "Roboto-Regular",
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: -0.408,
    color: "#212121",
    marginTop: 55,
  },
  container: {
    flex: 1,
    //alignItems: "center",
    marginHorizontal: 16,
    display: "flex",
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  camera_container: {
    marginTop: 32,
    marginBottom: 32,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    position: "relative",
  },
  camera_icon: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 60,
    height: 60,
    alignSelf: "center",
    borderRadius: 180,
    paddingHorizontal: 18,
    paddingVertical: 20,
    alignItems: "center",
    marginVertical: 90,
  },
  input_wrapper: {
    borderColor: "#BDBDBD",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    marginTop: 16,
    height: 51,
    borderRadius: 100,
  },
  post_btn: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 17,
    color: "#FFFFFF",
    paddingVertical: 16,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});
