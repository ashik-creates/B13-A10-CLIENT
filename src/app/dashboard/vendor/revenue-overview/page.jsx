import VendorRevenueOverview from "@/components/vendor/VendorRevenueOverview";
import { getTransactionOverview } from "@/lib/api/payment";
import { getUserSession } from "@/lib/getSession";
const RevenueOverviewPage = async () => {
    const user = await getUserSession();
    const stats = await getTransactionOverview(user.id);
    console.log(stats);
    return (
        <div>
            <VendorRevenueOverview stats={stats} />
        </div>
    );
};

export default RevenueOverviewPage;