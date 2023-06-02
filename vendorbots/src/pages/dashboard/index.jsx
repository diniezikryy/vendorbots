import OrderTable from "@/modules/dashboard/components/OrderTable/OrderTable";
import DashboardLayout from "@/modules/dashboard/dashboardLayout";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import getOrders from "@/modules/dashboard/getOrders";
import { useQuery } from "react-query";

export default function DashboardPage(props) {
  const { isLoading, data } = useQuery("orders", getOrders);

  console.log(data);

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

DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
