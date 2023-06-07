import Link from "next/link";

const moment = require("moment");

const OrdersTableRow = ({ order }) => {
  return (
    <tr key={order.order_id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {order.order_id}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {moment(order.createdAt.toDate()).format("YYYY-MM-DD HH:mm")}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {order.customer.customer_name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {order.paid ? (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Paid
          </span>
        ) : (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            Unpaid
          </span>
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {order.status === "pending" ? (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            Unfulfilled
          </span>
        ) : (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Fulfilled
          </span>
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {order.total}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link
          className="text-indigo-600 hover:text-indigo-900"
          href={{
            pathname: `/dashboard/orders/${order.order_id}`, // the data
          }}
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default OrdersTableRow;
