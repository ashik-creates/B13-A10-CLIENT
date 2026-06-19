import Image from "next/image";
import {
  FaBus,
  FaTrain,
  FaPlane,
  FaShip,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Button } from "@heroui/react";
import CountdownTimer from "@/components/ticketDetails/CountDownTimer";
import { getSingleTicket } from "@/lib/api/ticket";

const icons = {
  bus: FaBus,
  train: FaTrain,
  plane: FaPlane,
  ship: FaShip,
};

const TicketDetailsPage = async ({ params }) => {
  const { id } = await params;
  const ticket = await getSingleTicket(id);

  const Icon = icons[ticket.transportType];

  const isExpired = new Date(ticket.departureDateTime) <= new Date();

  const isSoldOut = Number(ticket.quantity) <= 0;

  const disableBooking = isExpired || isSoldOut;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="relative h-[350px] overflow-hidden rounded-3xl md:h-[500px]">
        <Image
          src={ticket.image}
          alt={ticket.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            {ticket.title}
          </h1>

          <p className="mt-2 text-lg text-white/80">
            {ticket.from} → {ticket.to}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-divider bg-content1 p-6">
            <h2 className="mb-5 text-xl font-bold">Journey Information</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-default-500">Route</p>

                <div className="mt-1 flex items-center gap-2">
                  <FaMapMarkerAlt />
                  <span className="font-semibold">
                    {ticket.from} → {ticket.to}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-default-500">Transport</p>

                <div className="mt-1 flex items-center gap-2">
                  <Icon />
                  <span className="font-semibold capitalize">
                    {ticket.transportType}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-default-500">Departure</p>

                <p className="mt-1 font-semibold">
                  {new Date(ticket.departureDateTime).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-default-500">Available Tickets</p>

                <p className="mt-1 font-semibold">{ticket.quantity}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-divider bg-content1 p-6">
            <h2 className="mb-5 text-xl font-bold">Included Perks</h2>

            <div className="flex flex-wrap gap-3">
              {ticket.perks?.map((perk) => (
                <span
                  key={perk}
                  className="rounded-full border border-divider px-4 py-2 text-sm"
                >
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="h-fit rounded-3xl border border-divider bg-content1 p-6 lg:sticky lg:top-24">
          <h3 className="text-lg font-semibold">Booking Summary</h3>

          <div className="mt-6">
            <CountdownTimer departureDateTime={ticket.departureDateTime} />
          </div>

          <div className="mt-6 rounded-2xl bg-default-100 p-5">
            <p className="text-sm text-default-500">Price Per Ticket</p>

            <h2 className="mt-1 bg-linear-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-4xl font-bold text-transparent">
              ${ticket.price}
            </h2>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-default-500">Available</span>

            <span className="font-bold">{ticket.quantity}</span>
          </div>

          {(isSoldOut || isExpired) && (
            <div className="my-3 rounded-2xl border border-rose-500/20 bg-linear-to-r from-rose-500/10 to-orange-500/10 px-4 py-4 text-center backdrop-blur-sm">
              <p className="text-sm font-semibold text-rose-500">
                {isSoldOut
                  ? "No tickets available for this journey"
                  : "This journey has already departed"}
              </p>
            </div>
          )}

          <Button
            size="lg"
            isDisabled={disableBooking}
            className="mt-6 w-full bg-linear-to-r from-[#9C27B0] to-[#E91E63] text-white"
          >
            {isExpired
              ? "Departure Passed"
              : isSoldOut
                ? "Sold Out"
                : "Book Now"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TicketDetailsPage;
