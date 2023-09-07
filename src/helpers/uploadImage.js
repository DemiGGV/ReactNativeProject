import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../config";
import * as Crypto from "expo-crypto";
import Toast from "react-native-root-toast";

export const uploadImage = async (uriImage) => {
  const metadata = {
    contentType: "image/jpeg",
  };
  const path = `public/img-${Crypto.randomUUID()}.jpg`;
  const getBlobFromUri = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    return blob;
  };
  const theBlob = await getBlobFromUri(uriImage);

  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, theBlob, metadata);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        let toast = Toast.show(`Upload is ${progress}% done`, {
          duration: 1000,
          backgroundColor: "#40a6ce",
          shadowColor: "black",
          position: Toast.positions.CENTER,
          shadow: false,
          animation: false,
          hideOnPress: false,
          delay: 0,
        });
      },
      (err) => {
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
        reject(err);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadUrl);
        let toast = Toast.show(`Uploaded with URL: ${downloadUrl}`, {
          duration: 500,
          backgroundColor: "#40a6ce",
          shadowColor: "black",
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    );
  });
};
