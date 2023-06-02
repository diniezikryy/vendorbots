import { Listbox, Menu } from "@headlessui/react";
import {
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import {
  BellIcon,
  XMarkIcon as XMarkIconOutline,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const invoice = {
  subTotal: "$8,800.00",
  tax: "$1,760.00",
  total: "$10,560.00",
  items: [
    {
      id: 1,
      title: "Logo redesign",
      description: "New logo and digital asset playbook.",
      hours: "20.0",
      rate: "$100.00",
      price: "$2,000.00",
    },
    {
      id: 2,
      title: "Website redesign",
      description: "Design and program new company website.",
      hours: "52.0",
      rate: "$100.00",
      price: "$5,200.00",
    },
    {
      id: 3,
      title: "Business cards",
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: "12.0",
      rate: "$100.00",
      price: "$1,200.00",
    },
    {
      id: 4,
      title: "T-shirt design",
      description: "Three t-shirt design concepts.",
      hours: "4.0",
      rate: "$100.00",
      price: "$400.00",
    },
  ],
};
const activity = [
  {
    id: 1,
    type: "created",
    person: { name: "Chelsea Hagon" },
    date: "7d ago",
    dateTime: "2023-01-23T10:32",
  },
  {
    id: 2,
    type: "edited",
    person: { name: "Chelsea Hagon" },
    date: "6d ago",
    dateTime: "2023-01-23T11:03",
  },
  {
    id: 3,
    type: "sent",
    person: { name: "Chelsea Hagon" },
    date: "6d ago",
    dateTime: "2023-01-23T11:24",
  },
  {
    id: 4,
    type: "commented",
    person: {
      name: "Chelsea Hagon",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 5,
    type: "viewed",
    person: { name: "Alex Curren" },
    date: "2d ago",
    dateTime: "2023-01-24T09:12",
  },
  {
    id: 6,
    type: "paid",
    person: { name: "Alex Curren" },
    date: "1d ago",
    dateTime: "2023-01-24T09:20",
  },
];
const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIconMini,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

import firebase_db from "@/utils/firebase/db";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import {
  Bars3Icon,
  XMarkIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuthContext } from "@/utils/context/AuthContext";

const navigation = [
  { name: "Orders", href: "#", icon: RectangleStackIcon, current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const OrderDetailsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const { user, logOut } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/signin");
    } catch (err) {
      console.log(err.message);
    }
  };

  const getOrderDetails = async () => {
    const docRef = doc(firebase_db, "orders", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Order Details: ", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No order data found!");
    }
  };

  const { isLoading, data } = useQuery("order details", getOrderDetails);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-indigo-600"
                                        : "text-gray-400 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-indigo-600"
                                : "text-gray-400 group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        {/* Main content here  */}
        <main className="py-10 lg:pl-72">
          <div>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {/* Invoice summary */}
                <div className="lg:col-start-3 lg:row-end-1">
                  <h2 className="sr-only">Summary</h2>
                  <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                    <dl className="flex flex-wrap">
                      <div className="flex-auto pl-6 pt-6">
                        <dt className="text-sm font-semibold leading-6 text-gray-900">
                          Amount
                        </dt>
                        <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                          $10,560.00
                        </dd>
                      </div>
                      <div className="flex-none self-end px-6 pt-4">
                        <dt className="sr-only">Status</dt>
                        <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                          Paid
                        </dd>
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
                          Alex Curren
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
                          <time dateTime="2023-01-31">January 31, 2023</time>
                        </dd>
                      </div>
                      <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                        <dt className="flex-none">
                          <span className="sr-only">Status</span>
                          <CreditCardIcon
                            className="h-6 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </dt>
                        <dd className="text-sm leading-6 text-gray-500">
                          Paid with MasterCard
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                      <a
                        href="#"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Download receipt <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Invoice */}
                <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                  <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Invoice
                  </h2>
                  <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                    <div className="sm:pr-4">
                      <dt className="inline text-gray-500">Issued on</dt>{" "}
                      <dd className="inline text-gray-700">
                        <time dateTime="2023-23-01">January 23, 2023</time>
                      </dd>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:pl-4">
                      <dt className="inline text-gray-500">Due on</dt>{" "}
                      <dd className="inline text-gray-700">
                        <time dateTime="2023-31-01">January 31, 2023</time>
                      </dd>
                    </div>
                    <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                      <dt className="font-semibold text-gray-900">From</dt>
                      <dd className="mt-2 text-gray-500">
                        <span className="font-medium text-gray-900">
                          Acme, Inc.
                        </span>
                        <br />
                        7363 Cynthia Pass
                        <br />
                        Toronto, ON N3Y 4H8
                      </dd>
                    </div>
                    <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                      <dt className="font-semibold text-gray-900">To</dt>
                      <dd className="mt-2 text-gray-500">
                        <span className="font-medium text-gray-900">
                          Tuple, Inc
                        </span>
                        <br />
                        886 Walter Street
                        <br />
                        New York, NY 12345
                      </dd>
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
                          Projects
                        </th>
                        <th
                          scope="col"
                          className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                        >
                          Hours
                        </th>
                        <th
                          scope="col"
                          className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                        >
                          Rate
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
                      {invoice.items.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="max-w-0 px-0 py-5 align-top">
                            <div className="truncate font-medium text-gray-900">
                              {item.title}
                            </div>
                            <div className="truncate text-gray-500">
                              {item.description}
                            </div>
                          </td>
                          <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                            {item.hours}
                          </td>
                          <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                            {item.rate}
                          </td>
                          <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                            {item.price}
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
                          colSpan={3}
                          className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
                        >
                          Subtotal
                        </th>
                        <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">
                          {invoice.subTotal}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="pt-4 font-normal text-gray-700 sm:hidden"
                        >
                          Tax
                        </th>
                        <th
                          scope="row"
                          colSpan={3}
                          className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
                        >
                          Tax
                        </th>
                        <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">
                          {invoice.tax}
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
                          colSpan={3}
                          className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
                        >
                          Total
                        </th>
                        <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
                          {invoice.total}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default OrderDetailsPage;
