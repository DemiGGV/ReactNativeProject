import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export const LogoutBtn = () => {
  const navigation = useNavigation();
  const handleOnPress = () => {
    navigation.navigate("LoginScreen");
  };
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Feather
        name="log-out"
        size={24}
        color="#21212180"
        style={{ marginRight: 16 }}
      />
    </TouchableOpacity>
  );
};
