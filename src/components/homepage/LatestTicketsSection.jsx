import { getLatestTickets } from "@/lib/api/ticket";
import TicketCard from "../shared/TicketCard";

const LatestTicketsSection = async () => {
  const tickets = await getLatestTickets();

  return (
    <section className="container mx-auto my-16 px-4">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold">Latest Tickets</h2>

        <p className="mt-2 text-default-500">
          Explore the newest travel tickets added by our vendors.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {tickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </section>
  );
};

export default LatestTicketsSection;