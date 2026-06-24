import AdvertiseTicketsTable from "@/components/admin/AdvertiseTicketsTable";
import { getAllApprovedTicket} from "@/lib/api/ticket";

const AdvertiseTicketsPage = async () => {
    const tickets = await getAllApprovedTicket();
    return (
        <div className="my-5">
            <AdvertiseTicketsTable tickets={tickets}></AdvertiseTicketsTable>
        </div>
    );
};

export default AdvertiseTicketsPage;