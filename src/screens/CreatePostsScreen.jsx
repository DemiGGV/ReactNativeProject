import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { Formik } from "formik";
import { Feather } from "@expo/vector-icons";

export const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [focused, setFocused] = useState("");
  const [isCamPermission, setIsCamPermission] = useState(null);
  const [isMediaPermission, setIsMediaPermission] = useState(null);
  const [isLocationPermission, setIsLocationPermission] = useState(null);
  const [camRef, setCamRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);

  const focusedFieldStyle = {
    color: "#212121",
    backgroundColor: "#fff",
    borderColor: "#ff6c00",
  };
  const pendingStyle = {
    color: "#bdbdbd",
    backgroundColor: "#f6f6f6",
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();
      const locationPermission =
        await Location.requestForegroundPermissionsAsync();
      setIsCamPermission(cameraPermission.status === "granted");
      setIsMediaPermission(mediaPermission.status === "granted");
      setIsLocationPermission(locationPermission.status === "granted");
    })();
  }, []);

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

  const takePicture = async () => {
    console.log("Shoot!");
    if (camRef) {
      const { uri } = await camRef.takePictureAsync();
      setPhotoUri(uri);
      await MediaLibrary.createAssetAsync(uri);
    }
  };
  const publishPhoto = (values) => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
    setPhotoUri(null);
    navigation.navigate("HomeScreen", { screen: "PostsScreen" });
  };

  if (isCamPermission === null) {
    return (
      <PendingContainer>
        <Text>Loading...</Text>
      </PendingContainer>
    );
  }
  if (!isCamPermission) {
    return (
      <PendingContainer>
        <Text>No access to camera.</Text>
      </PendingContainer>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ContainerViewMain
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <MainView>
          <PhotoWrapper>
            {!photoUri ? (
              <Camera
                type={type}
                ref={setCamRef}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <Photo source={{ uri: photoUri }} />
            )}
            <PhotoBtn onPress={takePicture} st={photoUri}>
              <IconCam name="camera" size={24} st={photoUri} />
            </PhotoBtn>
          </PhotoWrapper>
          {!photoUri ? (
            <TextSig>Make a photo</TextSig>
          ) : (
            <TextSig>Edit photo</TextSig>
          )}
          <RegFormView>
            <Formik
              initialValues={{ name: "", geoloc: "" }}
              onSubmit={(values, { resetForm }) => {
                console.log("Submit!");
                setFocused("");
                resetForm();
                publishPhoto(values);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <FormWrapper>
                  <FormField
                    style={[focused === "name" && focusedFieldStyle]}
                    onFocus={() => {
                      setFocused("name");
                    }}
                    onChangeText={handleChange("name")}
                    onBlur={() => {
                      setFocused("");
                      handleBlur("name");
                    }}
                    editable={!!photoUri}
                    value={values.name}
                    placeholder="Photo title"
                  />
                  <View style={{ position: "relative" }}>
                    <FormFieldLoc
                      style={[focused === "geoloc" && focusedFieldStyle]}
                      onFocus={() => {
                        setFocused("geoloc");
                      }}
                      onChangeText={handleChange("geoloc")}
                      onBlur={() => {
                        setFocused("");
                        handleBlur("geoloc");
                      }}
                      editable={!!photoUri}
                      value={values.geoloc}
                      placeholder="Location"
                    />
                    <IconLoc name="map-pin" size={24} />
                  </View>
                  <SubmitBtn
                    onPress={handleSubmit}
                    title="Publish"
                    style={[!photoUri && pendingStyle]}
                    disabled={!photoUri}
                  >
                    <SubmitBtnText st={photoUri}>Publish</SubmitBtnText>
                  </SubmitBtn>
                </FormWrapper>
              )}
            </Formik>
          </RegFormView>
          <DeleteBtn
            onPress={() => {
              setPhotoUri(null);
            }}
            style={[keyboardStatus && { marginTop: 30 }]}
            disabled={!photoUri}
          >
            <IconTrash name="trash" size={24} st={photoUri} />
          </DeleteBtn>
        </MainView>
      </ContainerViewMain>
    </TouchableWithoutFeedback>
  );
};

const PendingContainer = styled.View``;
const ContainerViewMain = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff;
`;
const MainView = styled.View`
  width: 100%;
  height: auto;
  padding: 0 16px;
`;
const PhotoWrapper = styled.View`
  position: relative;
  width: 100%;
  height: 260px;
  border-radius: 8px;
  background-color: #f6f6f6;
  border-width: 1px;
  border-color: #e8e8e8;
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const Photo = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;
const PhotoBtn = styled.TouchableOpacity`
  position: absolute;
  top: 50%-30px;
  left: 50%-30px;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${(props) => (props.st ? "#ffffff30" : "#fff")};
`;
const IconCam = styled(Feather)`
  color: ${(props) => (props.st ? "#fff" : "#bdbdbd")};
  text-shadow: ${(props) => (props.st ? "#fff" : "#bdbdbd")} 0 0 5px;
`;
const TextSig = styled.Text`
  font-family: "Roboto-Regular";
  font-size: 16px;
  color: #bdbdbd;
  margin-bottom: 32px;
`;
const RegFormView = styled.View`
  width: 100%;
  justify-content: start;
  align-items: center;
  background-color: #fff;
`;
const FormWrapper = styled.View`
  width: 100%;
  height: auto;
`;
const FormField = styled.TextInput`
  border-style: solid;
  border-color: #e8e8e8;
  border-bottom-width: 1px;
  width: 100%;
  height: 50px;
  padding: 16px 0;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;
const FormFieldLoc = styled(FormField)`
  margin-top: 16px;
  padding-left: 30px;
`;
const IconLoc = styled(Feather)`
  position: absolute;
  left: 0;
  top: 28px;
  color: ${(props) => (props.st ? "#fff" : "#bdbdbd")};
`;
const SubmitBtn = styled.TouchableOpacity`
  justify-content: center;
  margin-top: 32px;
  height: 50px;
  border-radius: 100px;
  background-color: #ff6c00;
`;
const SubmitBtnText = styled.Text`
  color: ${(props) => (!props.st ? "#bdbdbd" : "#fff")};
  text-align: center;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;
const DeleteBtn = styled.TouchableOpacity`
  margin-top: 90px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  width: 70px;
  height: 40px;
  border-radius: 20px;
  background-color: #f6f6f6;
`;
const IconTrash = styled(Feather)`
  color: ${(props) => (!props.st ? "#bdbdbd" : "#212121")};
`;
