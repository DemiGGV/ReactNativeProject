import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";

export const MapScreen = ({ route }) => {
  const { coordinates } = route.params;
  const { latitude, longitude } = coordinates;

  return (
    <MapSView>
      <MapView
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
        region={{
          latitude: Number(latitude),
          longitude: Number(longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        onMapReady={() => console.log("Map is ready")}
      >
        {coordinates && (
          <Marker
            title="I am here"
            coordinate={{
              latitude: Number(latitude),
              longitude: Number(longitude),
            }}
            description="Destination"
          />
        )}
      </MapView>
    </MapSView>
  );
};

const MapSView = styled.View`
  flex: 1;
  background-color: "#fff";
  align-items: "center";
  justify-content: "center";
`;
