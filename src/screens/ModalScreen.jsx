import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image } from "react-native";
import styled from "styled-components/native";

export const ModalScreen = ({ route }) => {
  const navigation = useNavigation();
  const { imageUri } = route.params;

  return (
    <ModalView onPress={() => navigation.goBack()}>
      <Image
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
        source={{ uri: imageUri }}
        resizeMode="cover"
      />
    </ModalView>
  );
};

const ModalView = styled.Pressable`
  flex: 1;
  background-color: "#00000020";
  align-items: "center";
  justify-content: "center";
`;
