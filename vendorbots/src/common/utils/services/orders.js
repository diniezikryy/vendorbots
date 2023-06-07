import { collection, getDocs } from "firebase/firestore";
import firebase_db from "../firebase/db";

// Fetching all orders in Orders collection & all the items in the individual order's subcollection.
export const getAllOrders = async () => {
  let orders = [];

  const ordersSnapshot = await getDocs(collection(firebase_db, "orders"));
  ordersSnapshot.forEach((orderDoc) => {
    orders.push({ order_id: orderDoc.id, ...orderDoc.data() });
  });
  return orders;
};

export const getAllOrdersWItems = async () => {
  let orders = [];
  const ordersSnapshot = await getDocs(collection(firebase_db, "orders"));
  ordersSnapshot.forEach(async (orderDoc) => {
    let order = { order_id: orderDoc.id, ...orderDoc.data() };
    const orderItemsSnapshot = await getDocs(
      collection(firebase_db, "orders", orderDoc.id, "items")
    );
    let order_items = [];

    orderItemsSnapshot.forEach((itemDoc) => {
      order_items.push(itemDoc.data());
    });

    order["items"] = order_items;

    orders.push(order);
  });
  return orders;
};
