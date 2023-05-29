import firebase_app from "./config";
import { getFirestore } from "firebase/firestore";

const firebase_db = getFirestore(firebase_app);

export default firebase_db;
