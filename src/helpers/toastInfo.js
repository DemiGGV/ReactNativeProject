import Toast from "react-native-root-toast";

export const toastInfo = (message, color) => {
  let toast = Toast.show(message, {
    duration: 1000,
    backgroundColor: color,
    shadowColor: "black",
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};
