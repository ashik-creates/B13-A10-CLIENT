import AdvertiseTicketsTable from "@/components/admin/AdvertiseTicketsTable";
import { getAllTicket } from "@/lib/api/ticket";

const AdvertiseTicketsPage = async () => {
    const tickets = await getAllTicket();
    return (
        <div>
            <AdvertiseTicketsTable tickets={tickets}></AdvertiseTicketsTable>
        </div>
    );
};

export default AdvertiseTicketsPage;