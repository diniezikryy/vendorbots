const Invoice = ({ id, data, subtotal, total }) => {
  return (
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
            <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
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
              {subtotal}
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
              {total}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Invoice;
