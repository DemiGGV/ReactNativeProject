import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

import { logoutUser } from "../redux/user/authOperations";

export const LogoutBtn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOnPress = () => {
    dispatch(logoutUser());
    navigation.navigate("LoginScreen");
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Feather
        name="log-out"
        size={24}
        color="#BDBDBD"
        style={{ marginRight: 16 }}
      />
    </TouchableOpacity>
  );
};
