import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { Formik } from "formik";
import styled from "styled-components/native";

import { BackgroundComponent } from "../components/BackgroundComponent";
import { loginUser } from "../redux/user/authOperations";
import { auth } from "../../config";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [focused, setFocused] = useState("");
  const [showPass, setShowPass] = useState(false);

  const focusedFieldStyle = {
    color: "#212121",
    backgroundColor: "#fff",
    borderColor: "#ff6c00",
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const userAuth = auth.currentUser;
  if (userAuth) {
    navigation.navigate("HomeScreen", { screen: "PostsScreen" });
  }

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      resetForm();
      navigation.navigate("HomeScreen", { screen: "PostsScreen" });
    } catch (rejectedValueOrSerializedError) {}
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <BackgroundComponent>
          <ContainerViewMain
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <RegFormView
              style={keyboardStatus ? { height: 260 } : { height: 490 }}
            >
              <TitleH1>Autorization</TitleH1>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <FormWrapper>
                    <FormField
                      style={[focused === "email" && focusedFieldStyle]}
                      onFocus={() => {
                        setFocused("email");
                      }}
                      onChangeText={handleChange("email")}
                      onBlur={() => {
                        setFocused("");
                        handleBlur("email");
                      }}
                      value={values.email}
                      placeholder="E-mail"
                      inputMode="email"
                    />
                    <View>
                      <FormField
                        style={[focused === "password" && focusedFieldStyle]}
                        onFocus={() => {
                          setFocused("password");
                        }}
                        onChangeText={handleChange("password")}
                        onBlur={() => {
                          setFocused("");
                          handleBlur("password");
                        }}
                        value={values.password}
                        placeholder="Password"
                        secureTextEntry={!showPass}
                      />
                      <PasswordLink
                        onPress={() => {
                          setShowPass(!showPass);
                        }}
                      >
                        <PassLinkText>
                          {!showPass ? "Show password" : "Hide password"}
                        </PassLinkText>
                      </PasswordLink>
                    </View>
                    <SubmitBtn onPress={handleSubmit} title="Submit">
                      <SubmitBtnText>Sign in</SubmitBtnText>
                    </SubmitBtn>
                    <TouchOpWrapper
                      onPress={() => navigation.navigate("RegistrationScreen")}
                    >
                      <LinkText>Dont have account? Please register</LinkText>
                    </TouchOpWrapper>
                  </FormWrapper>
                )}
              </Formik>
            </RegFormView>
          </ContainerViewMain>
        </BackgroundComponent>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ContainerViewMain = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column-reverse;
  justify-content: end;
`;

const RegFormView = styled.View`
  padding: 0 16px 0 16px;
  justify-content: start;
  align-items: center;
  background-color: #fff;
  border-radius: 25px 25px 0 0;
`;

const TitleH1 = styled.Text`
  margin-top: 32px;
  color: #212121;
  text-align: center;
  font-family: "Roboto-Medium";
  font-size: 30px;
`;

const FormWrapper = styled.View`
  margin-top: 16px;
  width: 100%;
  height: auto;
`;

const FormField = styled.TextInput`
  border-width: 1px;
  border-color: #e8e8e8;
  background-color: #f6f6f6;
  width: 100%;
  height: 50px;
  margin-top: 16px;
  border-style: solid;
  border-radius: 10px;
  padding: 16px;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;

const SubmitBtn = styled.TouchableOpacity`
  justify-content: center;
  margin-top: 42px;
  height: 50px;
  border-radius: 100px;
  background-color: #ff6c00;
`;

const SubmitBtnText = styled.Text`
  color: #fff;
  text-align: center;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;

const TouchOpWrapper = styled.TouchableOpacity``;

const PasswordLink = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 43%;
`;

const PassLinkText = styled.Text`
  color: #1b4371;
  text-align: center;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;

const LinkText = styled.Text`
  margin-top: 16px;
  margin-bottom: 40px;
  color: #1b4371;
  text-align: center;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;
