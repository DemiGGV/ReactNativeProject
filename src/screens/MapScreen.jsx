import { Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styled from "styled-components/native";

export const MapScreen = ({ route }) => {
  const { coordinates } = route.params;
  const { latitude, longitude } = coordinates;

  return (
    <MapSView>
      <MapView
        provider={PROVIDER_GOOGLE}
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
