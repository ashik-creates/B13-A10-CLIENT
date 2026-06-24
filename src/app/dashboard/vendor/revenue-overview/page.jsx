import VendorRevenueOverview from "@/components/vendor/VendorRevenueOverview";
import { getTransactionOverview } from "@/lib/api/payment";
import { getUserSession } from "@/lib/getSession";
import { Chip } from "@heroui/react";

const RevenueOverviewPage = async () => {
  const user = await getUserSession();

  if (user?.isFraud) {
    return (
      <div className="my-10 px-4 lg:px-6">
        <div className="rounded-3xl border border-danger/30 bg-danger/10 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-danger">
                ⚠️ Fraud Account Detected
              </h2>

              <p className="mt-1 text-danger/80">
                Your account has been marked as fraudulent. You no longer have
                access to revenue statistics.
              </p>
            </div>

            <Chip color="danger" variant="flat" size="lg">
              Fraud Vendor
            </Chip>
          </div>
        </div>
      </div>
    );
  }

  const stats = await getTransactionOverview(user.id);

  return (
    <div className="my-10 px-4 lg:px-6">
      <VendorRevenueOverview stats={stats} />
    </div>
  );
};

export default RevenueOverviewPage;