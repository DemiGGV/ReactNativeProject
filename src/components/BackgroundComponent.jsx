import { StatusBar } from "react-native";
import styled from "styled-components/native";

const StyledBackground = styled.ImageBackground`
  flex: 1;
  justify-content: "center";
`;

export const BackgroundComponent = ({ children }) => {
  return (
    <StyledBackground
      source={require("../../assets/BG.jpg")}
      resizeMode="cover"
    >
      {children}
      <StatusBar style="auto" />
    </StyledBackground>
  );
};
