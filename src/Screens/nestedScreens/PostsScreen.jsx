import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Text, StyleSheet, SafeAreaView, FlatList, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { db } from "../../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

import { signOutUser } from "../../../redux/auth/auth-operations";

const PostsScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState(null);

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUser());
  };
  
  const getAllPosts = async () => {
    await onSnapshot(collection(db, "posts"), (snapshots) => {
      setPosts(snapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logout}>
          <Text style={styles.posts}>Your posts page</Text>
          <TouchableOpacity style={styles.logout_button} onPress={signOut}>
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.posts_container}>
              <Image
                source={{ uri: item.photo }}
                style={{ width: 343, height: 240, marginTop: 32 }}
              />
              <Text style={styles.description}>{item.title}</Text>
              <View style={styles.postDetails}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Comments",{
                    postId: item.id,
                    photo: item.photo,
                  })}
                >
                  <EvilIcons name="comment" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.comments}>0</Text>
                <TouchableOpacity
                  style={styles.location_button}
                  onPress={() => {
                    navigation.navigate("MapScreen", {
                      location: item.location,
                    })
                  }}
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
  posts_container: {
    marginHorizontal: 8, 
   justifyContent: "center",
  },
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
    flexDirection: "row",
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
    marginRight: 50,
  },
});
