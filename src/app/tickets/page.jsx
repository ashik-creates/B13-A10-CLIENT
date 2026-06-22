import TicketCard from "@/components/shared/TicketCard";
import TicketFilters from "@/components/tickets/TicketFilters";
import { getAllTicket } from "@/lib/api/ticket";

const AllTicketsPage = async ({ searchParams }) => {
  const filters = await searchParams;
  const querySearch = new URLSearchParams(filters)
  const queryString = querySearch.toString()
  console.log("queryString", queryString)
  const tickets = await getAllTicket(queryString);

  return (
    <div className="container mx-auto px-2">
      <TicketFilters></TicketFilters>
      <div className="grid grid-cols-3 my-10 gap-5">
        {tickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
        ))}
      </div>
    </div>
  );
};

export default AllTicketsPage;
