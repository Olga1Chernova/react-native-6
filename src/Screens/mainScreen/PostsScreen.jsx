import { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, FlatList, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

const USER_POSTS = [];

const PostsScreen = ({navigation}) => {
  const [posts, setPosts] = useState(USER_POSTS);
  const [location, setLocation] = useState(null);

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

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logout}>
          <Text style={styles.posts}>Your posts page</Text>
          <TouchableOpacity
            style={styles.logout_button}
            onPress={() => navigation.navigate("Login")}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item.photo }}
                style={{ width: 343, height: 240, marginTop: 32 }}
              />
              <Text style={styles.description}>{item.title}</Text>
              <View style={styles.postDetails}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Comments")}
                >
                  <EvilIcons name="comment" size={24} color="black" />;
                </TouchableOpacity>
                <Text style={styles.comments}>0</Text>
                <TouchableOpacity
                  style={styles.location_button}
                  onPress={() => navigation.navigate("Map", { location, item })}
                >
                  <EvilIcons name="location" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    );
}

export default PostsScreen;

const styles = StyleSheet.create({
  posts: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E5E5E5",
  },
  logout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 55,
  },
  logout_button: {
    marginLeft: 45,
  },
  postDetails: {
    marginTop: 8,
    display: "flex",
  },
  description: {
    marginTop: 8,
  },
  location: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.408,
    color: "#212121",
    textAlign: "right",
    textDecorationLine: "underline",
    borderColor: "#000000",
    marginLeft: 4,
  },
  comments: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.408,
    color: "#212121",
    textAlign: "left",
    textDecorationLine: "underline",
    borderColor: "#000000",
    marginLeft: 6,
  },
});
