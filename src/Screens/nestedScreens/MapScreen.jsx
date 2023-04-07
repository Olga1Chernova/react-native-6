import { Text, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={item.title}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

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
