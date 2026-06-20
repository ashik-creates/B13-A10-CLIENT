import BookedTicketCard from "@/components/user/BookedTicketCard";
import { getMyBookedTickets } from "@/lib/api/booking";
import { getUserSession } from "@/lib/getSession";

const MyBookedTicketPage = async() => {
    const user = await getUserSession();
    const userId = user?.id;
    console.log(userId);
    const bookedTickets = await getMyBookedTickets(userId);
    return (
        <div>
            {bookedTickets.map((booking) => (
                <BookedTicketCard key={booking._id} booking={booking}></BookedTicketCard>
            ))}
        </div>
    );
};

export default MyBookedTicketPage;