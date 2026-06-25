import BookedTicketCard from "@/components/user/BookedTicketCard";
import { getMyBookedTickets } from "@/lib/api/booking";
import { getUserSession } from "@/lib/getSession";

const MyBookedTicketPage = async () => {
  const user = await getUserSession();
  const userId = user?.id;

  const bookedTickets = await getMyBookedTickets(userId);

  return (
    <div className="my-6 px-4">
      {bookedTickets.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {bookedTickets.map((booking) => (
            <BookedTicketCard
              key={booking._id}
              booking={booking}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-divider bg-content1 p-10 text-center">
          <h2 className="text-2xl font-bold">
            No Tickets Booked Yet
          </h2>

          <p className="mt-2 max-w-md text-default-500">
            You have not booked any tickets yet. Explore available
            tickets and start your next journey.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyBookedTicketPage;