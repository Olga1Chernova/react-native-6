import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  Alert, TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";
import { db } from "../../../firebase/config";

import { collection, doc, addDoc, onSnapshot } from "firebase/firestore";

const CommentsScreen = ({ route }) => {
   const { postId, photo } = route.params;
   const [comment, setComment] = useState("");
   const [allComments, setAllComments] = useState([]);
   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
   const { login } = useSelector((state) => state.auth);

   useEffect(() => {
     getAllComments();
   }, []);
  
  const uploadCommentToServer = async () => {
    try {
      const PostRef = await doc(db, "posts", postId);
      await addDoc(collection(PostRef, "comments"), {
        comment,
        login,
      });
    } catch (error) {
      console.log("error.message", error.message);
      Alert.alert("try again");
    }
  };

  const getAllComments = async () => {
    const PostRef = await doc(db, "posts", postId);
    onSnapshot(collection(PostRef, "comments"), (data) =>
      setAllComments(
        data.docs.map((doc) => ({
          ...doc.data(),
        }))
      )
    );
  };

  const createComment = () => {
    uploadCommentToServer();
    if (!comment.trim()) {
      Alert.alert("the comment cannot be empty");
      return;
    }
    keyboardHide();
    setComment("");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.userImage} />
        <FlatList
          data={allComments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback>
              <View style={styles.data}>
                <Text style={styles.dataComment}>{item.comment}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        />

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Leave comment"
            placeholderTextColor="#BDBDBD"
            paddingLeft={16}
            value={comment}
            onChangeText={(value) => setComment(value)}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonCreate}
          activeOpacity={0.7}
          onPress={createComment}
        >
          <Ionicons
            name="arrow-up"
            size={34}
            color="#FFFFFF"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
  },
  userImage: { width: "100%", height: 240, borderRadius: 8, marginTop: 32 },
  inputWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  data: { flexDirection: "row", alignItems: "center", marginTop: 32 },
  dataComment: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#00000008",
    color: "#212121",
  },
  input: {
    marginHorizontal: 16,
    border: "1px solid #E8E8E8",
    height: 50,
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    backgroundColor: "#F6F6F6",
    boxSizing: "border-box",
    borderRadius: 100,
  },
  buttonIcon: {},

  buttonCreate: {
    position: "absolute",
    bottom: 22,
    right: 30,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    backgroundColor: "#FF6C00",
  },
  buttonCreateText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    paddingVertical: 16,
  },
});
