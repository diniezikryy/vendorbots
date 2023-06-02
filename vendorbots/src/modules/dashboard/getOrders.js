import firebase_db from "@/common/utils/firebase/db";
import { collection, getDocs } from "firebase/firestore";

const getOrders = async () => {
  const colRef = collection(firebase_db, "orders");

  const snapshot = await getDocs(colRef);

  const docs = snapshot.docs.map((doc) => {
    const data = doc.data();

    data.id = doc.id;

    return data;
  });

  return docs;
};

export default getOrders;
