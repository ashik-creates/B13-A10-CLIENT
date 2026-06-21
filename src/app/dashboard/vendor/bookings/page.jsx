import RequestedBookingsTable from "@/components/vendor/RequestedBookingsTable";
import { getRequestedBookings } from "@/lib/api/booking";
import { getUserSession } from "@/lib/getSession";

const RequestedBookingsPage = async () => {
    const user = await getUserSession()
    const bookings = await getRequestedBookings(user?.id); 
    return (
        <div>
            <RequestedBookingsTable bookings={bookings} />
        </div>
    );
};

export default RequestedBookingsPage;