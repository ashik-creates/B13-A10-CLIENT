import TicketCard from "@/components/shared/TicketCard";
import { getAllTicket } from "@/lib/api/ticket";

const AllTicketsPage = async () => {
  const tickets = await getAllTicket();

  return (
    <div className="container mx-auto px-2">
      <div className="grid grid-cols-3 my-10 gap-5">
        {tickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
        ))}
      </div>
    </div>
  );
};

export default AllTicketsPage;
