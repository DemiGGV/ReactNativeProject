import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { View, Text, Keyboard, Platform, Pressable } from "react-native";
import styled from "styled-components/native";
import { Formik } from "formik";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

import { addPost } from "../redux/posts/postsOperations";
import { getUser } from "../redux/user/authSelectors";
import { uploadImage } from "../helpers/uploadImage";
import { Loader } from "../components/Loader";

export const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [focused, setFocused] = useState("");
  const [isDisableButtons, setIsDisableButtons] = useState(true);
  const [isCamPermission, setIsCamPermission] = useState(null);
  const [isMediaPermission, setIsMediaPermission] = useState(null);
  const [isLocationPermission, setIsLocationPermission] = useState(null);
  const [coords, setCoords] = useState({});
  const cameraRef = useRef(null);
  const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back);
  const [flashModeSet, setFlashModeSet] = useState(
    Camera.Constants.FlashMode.auto
  );
  const [photoUri, setPhotoUri] = useState(null);

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
      try {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaPermission = await MediaLibrary.requestPermissionsAsync();
        const locationPermission =
          await Location.requestForegroundPermissionsAsync();
        setIsCamPermission(cameraPermission.status === "granted");
        setIsMediaPermission(mediaPermission.status === "granted");
        setIsLocationPermission(locationPermission.status === "granted");
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted")
          throw new Error("Permission to access location was denied");
        const location = await Location.getCurrentPositionAsync({});
        setCoords({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (err) {
        let toast = Toast.show(err.message, {
          duration: 1000,
          backgroundColor: "#f02c2c",
          shadowColor: "black",
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
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
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        skipProcessing: true,
      });
      setPhotoUri(uri);
      await MediaLibrary.createAssetAsync(uri);
      setIsDisableButtons(false);
    }
  };

  const publishPhoto = (values, { resetForm }) => {
    (async () => {
      try {
        setIsDisableButtons(true);
        const imageURL = await uploadImage(photoUri);
        if (!imageURL) return;
        const post = {
          userid: user.uid,
          imageUri: imageURL,
          title: values.name,
          location: {
            name: values.geoloc,
            coordinates: coords,
          },
          comments: [],
          likes: [],
        };
        await dispatch(addPost(post)).unwrap();
        setPhotoUri(null);
        resetForm();
        navigation.navigate("HomeScreen", { screen: "PostsScreen" });
      } catch (err) {
        setIsDisableButtons(false);
        let toast = Toast.show(err.message, {
          duration: 1000,
          backgroundColor: "#f02c2c",
          shadowColor: "black",
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    })();
  };

  const isFocused = useIsFocused();

  if (isCamPermission === null) {
    return <Loader />;
  } else if (!isCamPermission || !isMediaPermission || !isLocationPermission) {
    return (
      <PendingContainer>
        <Text
          style={{
            color: "#f02c2c",
            fontFamily: "Roboto-Regular",
            fontSize: 20,
          }}
        >
          No access to camera or storage or location.
        </Text>
      </PendingContainer>
    );
  }

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <ContainerViewMain
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <MainView>
          <PhotoWrapper>
            {!photoUri && isFocused ? (
              <Camera
                type={typeCamera}
                flashMode={flashModeSet}
                ref={cameraRef}
                ratio={"4:3"}
                style={{
                  width: 360,
                  height: 480,
                }}
              />
            ) : (
              <Photo source={{ uri: photoUri }} />
            )}
            <PhotoBtn
              onPress={takePicture}
              st={photoUri}
              disabled={!isDisableButtons}
            >
              <IconCam name="camera" size={24} st={photoUri} />
            </PhotoBtn>
            <TypeBtn
              onPress={() =>
                setTypeCamera(
                  typeCamera === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )
              }
              st={photoUri}
              disabled={!isDisableButtons}
            >
              <IconCam name="refresh-cw" size={24} st={photoUri} />
            </TypeBtn>
          </PhotoWrapper>
          {!photoUri ? (
            <TextSig>Make a photo</TextSig>
          ) : (
            <TextSig>Edit photo</TextSig>
          )}
          <RegFormView>
            <Formik
              initialValues={{ name: "", geoloc: "" }}
              onSubmit={publishPhoto}
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
                    editable={!isDisableButtons}
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
                      editable={!isDisableButtons}
                      value={values.geoloc}
                      placeholder="Location"
                    />
                    <IconLoc name="map-pin" size={24} />
                  </View>
                  <SubmitBtn
                    onPress={handleSubmit}
                    title="Publish"
                    style={[isDisableButtons && pendingStyle]}
                    disabled={isDisableButtons}
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
              setIsDisableButtons(true);
            }}
            style={[keyboardStatus && { marginTop: 30 }]}
            disabled={isDisableButtons}
          >
            <IconTrash name="trash" size={24} st={!isDisableButtons} />
          </DeleteBtn>
        </MainView>
      </ContainerViewMain>
    </Pressable>
  );
};

const PendingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const ContainerViewMain = styled.KeyboardAvoidingView`
  flex: 1;
  /* justify-content: flex-end; */
  align-items: center;
  background-color: #fff;
`;
const MainView = styled.View`
  margin-top: 10px;
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
  background-color: ${(props) => (props.st ? "#00000020" : "#ffffff50")};
`;
const TypeBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 30px;
  background-color: #ffffff30;
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
const SubmitBtn = styled.Pressable`
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
