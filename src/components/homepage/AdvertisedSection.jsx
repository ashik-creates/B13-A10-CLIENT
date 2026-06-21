import { getAdvertisedTickets } from "@/lib/api/ticket";
import TicketCard from "../shared/TicketCard";

const AdvertisedSection = async () => {
  const advertisedTickets = await getAdvertisedTickets();

  return (
    <section className="container mx-auto my-16 px-2">
      <div className="mb-10 text-center">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          Featured Deals
        </span>

        <h2 className="mt-4 text-4xl font-bold">
          🔥 Hot Ticket Offers
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-default-500">
          Discover our handpicked travel deals and grab the best tickets
          before they are gone.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {advertisedTickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </section>
  );
};

export default AdvertisedSection;
