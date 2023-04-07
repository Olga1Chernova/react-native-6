import { Text, StyleSheet, View } from "react-native";

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.posts}>Your Profile Page</Text>
        </View>
    )
};

export default ProfileScreen;

const styles = StyleSheet.create({
  posts: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: -0.408,
    color: "#212121",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
