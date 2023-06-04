import DashboardLayout from "@/common/layouts/dashboardLayout";
import InvoiceSummary from "@/common/components/dashboard/orders/order_details/InvoiceSummary";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import LoadingSkeleton from "@/common/components/elements/LoadingSkeleton";
import Invoice from "@/common/components/dashboard/orders/order_details/Invoice";
import Link from "next/link";

import firebase_db from "@/common/utils/firebase/db";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function OrderDetailsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;

  const { isLoading, data } = useQuery(["order_detail", id], async () => {
    const docRef = doc(firebase_db, "orders", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No order data found!");
    }
  });

  const getSubtotal = (order_items) => {
    let subtotal = 0;
    order_items.forEach((order_item) => {
      subtotal += order_item.price * order_item.quantity;
    });
    return subtotal;
  };

  const getTotal = (subtotal, second_payment = 0) => {
    return subtotal + second_payment;
  };

  const changeFulfilStatus = useMutation({
    mutationFn: async () => {
      const docRef = doc(firebase_db, "orders", id);
      const docSnap = await getDoc(docRef);

      await updateDoc(docRef, {
        order_completed: !docSnap.data().order_completed,
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["order_detail", id] });
      const prevDocSnap = queryClient.getQueryData(["order_detail", id]);
      queryClient.setQueryData(["order_detail", id], data);
      return { prevDocSnap, data };
    },
    onError: (err, context) => {
      queryClient.setQueryData(["order_detail", id], context.prevDocSnap);
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["order_detail", id],
      }),
  });

  const changePaidStatus = useMutation({
    mutationFn: async () => {
      const docRef = doc(firebase_db, "orders", id);
      const docSnap = await getDoc(docRef);

      await updateDoc(docRef, {
        paid: !docSnap.data().paid,
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["order_detail", id] });
      const prevDocSnap = queryClient.getQueryData(["order_detail", id]);
      queryClient.setQueryData(["order_detail", id], data);
      return { prevDocSnap, data };
    },
    onError: (err, context) => {
      queryClient.setQueryData(["order_detail", id], context.prevDocSnap);
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["order_detail", id],
      }),
  });

  return (
    <main>
      {isLoading ? (
        <LoadingSkeleton count={10} />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-4 flex">
            <Link
              href={{
                pathname: `/dashboard/`,
              }}
            >
              <button
                type="button"
                className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <ArrowLeftIcon
                  className="text-indigo-600 -ml-0.5 h-5 w-5 "
                  aria-hidden="true"
                />
              </button>
            </Link>
            <div className="ml-auto">
              <button
                type="button"
                onClick={() => {
                  changeFulfilStatus.mutate();
                }}
                className="rounded-md  bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Mark as fulfilled
              </button>
              <button
                type="button"
                onClick={() => {
                  changePaidStatus.mutate();
                }}
                className="ml-4 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Mark as paid
              </button>
              <button
                type="button"
                className="rounded-md ml-4 bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancel Order
              </button>
            </div>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Invoice summary */}
            <InvoiceSummary
              total={getTotal(
                getSubtotal(data.order_items),
                data.second_payment
              )}
              data={data}
            />

            {/* Invoice */}
            <Invoice
              id={id}
              data={data}
              subtotal={getSubtotal(data.order_items)}
              total={getTotal(
                getSubtotal(data.order_items),
                data.second_payment
              )}
            />
          </div>
        </div>
      )}
    </main>
  );
}

OrderDetailsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
