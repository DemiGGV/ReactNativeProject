import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";

export const Loader = () => (
  <Container>
    <ActivityIndicator size="large" color="#40a6ce" />
  </Container>
);

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #00000020;
  justify-content: center;
  align-items: center;
`;
