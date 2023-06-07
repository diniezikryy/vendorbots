import DashboardLayout from "@/common/layouts/dashboardLayout";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useQuery } from "react-query";
import { getAllOrders } from "@/common/utils/services/orders";

import OrdersTable from "@/common/components/dashboard/orders/OrdersTable";

export default function OrdersPage(props) {
  const { isLoading, data } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>{props.title || <Skeleton />}</h1>
          {props.body || <Skeleton />}
        </div>
      ) : (
        <OrdersTable orders={data} />
      )}
    </div>
  );
}

OrdersPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
