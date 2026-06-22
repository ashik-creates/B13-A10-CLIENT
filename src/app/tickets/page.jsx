import TicketCard from "@/components/shared/TicketCard";
import TicketFilters from "@/components/tickets/TicketFilters";
import TicketListContainer from "@/components/tickets/TicketListContainer";
import { getAllTicket } from "@/lib/api/ticket";
import { Suspense } from "react";

const AllTicketsPage = async ({ searchParams }) => {
  const filters = await searchParams;
  const querySearch = new URLSearchParams(filters)
  const queryString = querySearch.toString()
  console.log("queryString", queryString)
  const {total, tickets} = await getAllTicket(queryString);

  return (
    <div className="container mx-auto px-2 my-5">
      <Suspense>
        <TicketFilters></TicketFilters>
      </Suspense>
      <TicketListContainer tickets={tickets} total={total} filters={filters}></TicketListContainer>
    </div>
  );
};

export default AllTicketsPage;
