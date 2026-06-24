import BookedTicketCard from "@/components/user/BookedTicketCard";
import { getMyBookedTickets } from "@/lib/api/booking";
import { getUserSession } from "@/lib/getSession";

const MyBookedTicketPage = async() => {
    const user = await getUserSession();
    const userId = user?.id;
    console.log(userId);
    const bookedTickets = await getMyBookedTickets(userId);
    return (
        <div className="grid grid-cols-2 gap-5 my-10 mx-4 my-5">
            {bookedTickets.map((booking) => (
                <BookedTicketCard key={booking._id} booking={booking}></BookedTicketCard>
            ))}
        </div>
    );
};

export default MyBookedTicketPage;