import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrdeGATe7Qdcu79NKUOGc6FsVWMgNQAl0",
  authDomain: "reactnativegoit77.firebaseapp.com",
  projectId: "reactnativegoit77",
  storageBucket: "reactnativegoit77.appspot.com",
  messagingSenderId: "635563799748",
  appId: "1:635563799748:web:8ca20468f4301cfd380591",
  measurementId: "G-D6XV259111",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
