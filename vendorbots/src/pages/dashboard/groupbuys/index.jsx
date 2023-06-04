import DashboardLayout from "@/common/layouts/dashboardLayout";

export default function GroupbuyPage() {
  return (
    <div>
      <h1>This is the group buy page!</h1>
    </div>
  );
}

GroupbuyPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
