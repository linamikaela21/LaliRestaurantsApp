import React from 'react';
import MapView, { Marker } from "react-native-maps";
import openMap from "react-native-open-maps";
import { styles } from "./Map.styles";

export const Map = ({ location, name }) => {
    const openAppMap = () => {
        openMap({
          latitude: location.latitude,
          longitude: location.longitude,
          zoom: 19,
          query: name,
        });
      };
    return (
        <MapView
        style={styles.content}
        initialRegion={location}
        onPress={openAppMap}
      >
        <Marker coordinate={location} />
      </MapView>
    );
}