import DashboardLayout from "@/common/layouts/dashboardLayout";

export default function DashboardPage() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
