import DashboardLayout from "@/common/layouts/dashboardLayout";
import firebase_db from "@/common/utils/firebase/db";
import { collection, getDocs } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "react-query";

export default function ProductPage() {
  return <div>product_page</div>;
}

ProductPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
