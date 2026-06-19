import MyAddedCard from "@/components/vendor/MyAddedCard";
import { getMyTicket } from "@/lib/api/ticket";
import { getUserSession } from "@/lib/getSession";
import React from "react";

const MyAddedTicketPage = async () => {
  const user = await getUserSession();
  const tickets = await getMyTicket(user?.id);
  return (
    <div className="grid grid-cols-3 my-10 mx-5 gap-5">
      {tickets.map((ticket) => (
        <MyAddedCard key={ticket._id} ticket={ticket}></MyAddedCard>
      ))}
    </div>
  );
};

export default MyAddedTicketPage;
