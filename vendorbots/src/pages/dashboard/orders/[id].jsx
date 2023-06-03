import DashboardLayout from "@/common/layouts/dashboardLayout";
import firebase_db from "@/common/utils/firebase/db";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

export default function OrderDetailsPage(props) {
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
        <div>
          <h1>{props.title || <Skeleton />}</h1>
          {props.body || <Skeleton count={10} />}
        </div>
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
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
            </div>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Invoice summary */}
            <div className="lg:col-start-3 lg:row-end-1">
              <h2 className="sr-only">Summary</h2>
              <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">
                      Total
                    </dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                      {getTotal(
                        getSubtotal(data.order_items),
                        data.second_payment
                      )}
                    </dd>
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                    <dt className="sr-only">Status</dt>

                    {data.paid ? (
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        Unpaid
                      </span>
                    )}
                  </div>
                  <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Client</span>
                      <UserCircleIcon
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm font-medium leading-6 text-gray-900">
                      {data.customer.customer_username}
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Due date</span>
                      <CalendarDaysIcon
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm leading-6 text-gray-500">
                      <time>{data.date.toDate().toLocaleString()}</time>
                    </dd>
                  </div>
                  <div className="my-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Status</span>
                      <CreditCardIcon
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm leading-6 text-gray-500">
                      Paid with Paylah!
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Invoice */}
            <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
              <div className="flex justify-between">
                <h2 className="text-base font-semibold leading-6 text-gray-900">
                  Invoice ID: {id}
                </h2>
                <h2 className="">
                  {data.order_completed ? (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Fulfilled
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      Unfulfilled
                    </span>
                  )}
                </h2>
              </div>
              <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                <div className="sm:pr-4">
                  <dt className="inline text-gray-500">Issued on</dt>{" "}
                  <dd className="inline text-gray-700">
                    <time className="text-gray-500">
                      {data.date.toDate().toDateString()} to
                    </time>{" "}
                    <span className="inline text-gray-500 font-bold capitalize">
                      {data.customer.customer_name}
                    </span>{" "}
                  </dd>
                  <br />
                  <div className="inline text-gray-500">
                    Mode of collection:{" "}
                    <span className="capitalize text-gray-500 font-bold">
                      {data.mode_of_collection}
                    </span>
                  </div>
                </div>
              </dl>
              <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                <colgroup>
                  <col className="w-full" />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className="border-b border-gray-200 text-gray-900">
                  <tr>
                    <th scope="col" className="px-0 py-3 font-semibold">
                      Product
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                    >
                      Batch
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                    >
                      Per Unit
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="py-3 pl-8 pr-0 text-right font-semibold"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.order_items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="max-w-0 px-0 py-5 align-top">
                        <div className="truncate font-medium text-gray-900">
                          {item.product_name}
                        </div>
                      </td>
                      <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                        {item.batch}
                      </td>
                      <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                        {item.price}
                      </td>
                      <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                        {item.quantity}
                      </td>
                      <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 font-bold">
                        {item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      scope="row"
                      className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden"
                    >
                      Subtotal
                    </th>
                    <th
                      scope="row"
                      colSpan={4}
                      className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
                    >
                      Subtotal
                    </th>
                    <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">
                      {getSubtotal(data.order_items)}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="pt-4 font-normal text-gray-700 sm:hidden"
                    >
                      Second Payment
                    </th>
                    <th
                      scope="row"
                      colSpan={4}
                      className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
                    >
                      Second Payment
                    </th>
                    <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">
                      {data.second_payment}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="pt-4 font-semibold text-gray-900 sm:hidden"
                    >
                      Total
                    </th>
                    <th
                      scope="row"
                      colSpan={4}
                      className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
                    >
                      Total
                    </th>
                    <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
                      {getTotal(
                        getSubtotal(data.order_items),
                        data.second_payment
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

OrderDetailsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
