import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../config";
import Toast from "react-native-root-toast";
import { useSelector } from "react-redux";
import { getUser } from "../redux/user/authSelectors";

const postsRef = collection(db, "posts");

export const addCollection = async () => {
  // [START firestore_data_get_dataset]
  const user = useSelector(getUser);
  try {
    await setDoc(doc(postsRef), {
      userid: user.uid,
      imageUri: "../imgs/oldHouse.jpg",
      title: "Old house in Venice",
      location: {
        name: "Venice, Italy",
        coordinates: {
          latitude: "45.438759",
          longitude: "12.327145",
        },
      },
      comments: [
        {
          user: "mblCBStjthScoosO2uupv3eomWw2",
          comment: "Lorem ipsum dolor sit amet.",
          time: "09 червня, 2020  08:40",
        },
        {
          user: "Ms4AQzbtrRhcl5AE82ebDuVSyO12",
          comment: "Lorem ipsum dolor sit amet consectetur adipisicing.",
          time: "09 червня, 2020 | 09:14",
        },
        {
          user: "mblCBStjthScoosO2uupv3eomWw2",
          comment: "Lorem, ipsum dolor.",
          time: "09 червня, 2020  09:40",
        },
        {
          user: "Ms4AQzbtrRhcl5AE82ebDuVSyO12",
          comment: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          time: "09 червня, 2020  10:40",
        },
      ],
      likes: 200,
    });
    await setDoc(doc(postsRef), {
      userid: user.uid,
      imageUri: "../imgs/down.jpg",
      title: "Down",
      location: {
        name: "Black See, Ukraine",
        coordinates: {
          latitude: "46.482952",
          longitude: "30.712481",
        },
      },
      comments: [
        {
          user: "mblCBStjthScoosO2uupv3eomWw2",
          comment: "Lorem ipsum dolor sit amet.",
          time: "09 червня, 2020  08:40",
        },
        {
          user: "Ms4AQzbtrRhcl5AE82ebDuVSyO12",
          comment: "Lorem ipsum dolor sit amet consectetur adipisicing.",
          time: "09 червня, 2020 | 09:14",
        },
        {
          user: "mblCBStjthScoosO2uupv3eomWw2",
          comment: "Lorem, ipsum dolor.",
          time: "09 червня, 2020  09:40",
        },
        {
          user: "Ms4AQzbtrRhcl5AE82ebDuVSyO12",
          comment: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          time: "09 червня, 2020  10:40",
        },
      ],
      likes: 200,
    });
    await setDoc(doc(postsRef), {
      userid: user.uid,
      imageUri: "../imgs/oldHouse.jpg",
      title: "Old house in Venice",
      location: {
        name: "Venice, Italy",
        coordinates: {
          latitude: "45.438759",
          longitude: "12.327145",
        },
      },
      comments: [
        {
          user: "mblCBStjthScoosO2uupv3eomWw2",
          comment: "Lorem ipsum dolor sit amet.",
          time: "09 червня, 2020  08:40",
        },
        {
          user: "Ms4AQzbtrRhcl5AE82ebDuVSyO12",
          comment: "Lorem ipsum dolor sit amet consectetur adipisicing.",
          time: "09 червня, 2020 | 09:14",
        },
        {
          user: "mblCBStjthScoosO2uupv3eomWw2",
          comment: "Lorem, ipsum dolor.",
          time: "09 червня, 2020  09:40",
        },
        {
          user: "Ms4AQzbtrRhcl5AE82ebDuVSyO12",
          comment: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          time: "09 червня, 2020  10:40",
        },
      ],
      likes: 200,
    });
    await setDoc(doc(postsRef), {
      userid: user.uid,
      imageUri: "../imgs/down.jpg",
      title: "Down",
      location: {
        name: "Black See, Ukraine",
        coordinates: {
          latitude: "46.482952",
          longitude: "30.712481",
        },
      },
      comments: [
        {
          user: "mblCBStjthScoosO2uupv3eomWw2",
          comment: "Lorem ipsum dolor sit amet.",
          time: "09 червня, 2020  08:40",
        },
        {
          user: "Ms4AQzbtrRhcl5AE82ebDuVSyO12",
          comment: "Lorem ipsum dolor sit amet consectetur adipisicing.",
          time: "09 червня, 2020 | 09:14",
        },
        {
          user: "mblCBStjthScoosO2uupv3eomWw2",
          comment: "Lorem, ipsum dolor.",
          time: "09 червня, 2020  09:40",
        },
        {
          user: "Ms4AQzbtrRhcl5AE82ebDuVSyO12",
          comment: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          time: "09 червня, 2020  10:40",
        },
      ],
      likes: 200,
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
};
