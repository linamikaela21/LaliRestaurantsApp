import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCjYAYLqPzGW168UMnNSzP-7VMdrVqcGg",
  authDomain: "restaurantslaliapp.firebaseapp.com",
  projectId: "restaurantslaliapp",
  storageBucket: "restaurantslaliapp.appspot.com",
  messagingSenderId: "711155543602",
  appId: "1:711155543602:web:d921df9df5afd1722d962b"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
