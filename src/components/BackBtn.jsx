import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export const BackBtn = () => {
  const navigation = useNavigation();
  const handleOnPress = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Feather
        name="arrow-left"
        size={24}
        color="#21212180"
        style={{ marginLeft: 16 }}
      />
    </TouchableOpacity>
  );
};
