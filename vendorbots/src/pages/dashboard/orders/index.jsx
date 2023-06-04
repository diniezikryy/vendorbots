import OrderTable from "@/common/components/dashboard/orders/OrderTable";
import DashboardLayout from "@/common/layouts/dashboardLayout";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useQuery } from "react-query";

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

export default function OrdersPage(props) {
  const { isLoading, data } = useQuery("orders", getOrders);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>{props.title || <Skeleton />}</h1>
          {props.body || <Skeleton count={10} />}
        </div>
      ) : (
        <OrderTable orders={data} />
      )}
    </div>
  );
}

OrdersPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
