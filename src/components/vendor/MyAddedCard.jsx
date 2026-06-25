import Image from "next/image";
import { Button, Card } from "@heroui/react";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";
import UpdateTicketModal from "./UpdateTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";

const transportIcons = {
  bus: <FaBus size={16} />,
  train: <FaTrain size={16} />,
  plane: <FaPlane size={16} />,
  ship: <FaShip size={16} />,
};

const MyAddedCard = ({ ticket }) => {
  const isRejected = ticket.status === "rejected";

  const statusStyles = {
    pending: "border border-amber-500/20 bg-amber-500/10 text-amber-500",
    approved: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
    rejected: "border border-red-500/20 bg-red-500/10 text-red-500",
  };

  return (
    <Card
      className={`h-full overflow-hidden border border-divider bg-content1 transition-all duration-300 ${
        isRejected
          ? "opacity-75"
          : "hover:-translate-y-1 hover:border-purple-500/20 hover:shadow-xl hover:shadow-purple-500/10"
      }`}
    >
      <div className="relative h-56">
        <Image
          src={ticket.image}
          alt={ticket.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold capitalize backdrop-blur-md ${statusStyles[ticket.status]}`}
        >
          {ticket.status}
        </span>

        <div className="absolute bottom-4 left-4">
          <h2 className="text-xl font-bold text-white">{ticket.title}</h2>

          <p className="text-sm text-white/80">
            {ticket.from} → {ticket.to}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 rounded-xl bg-default-100 px-3 py-2">
          <span className="text-[#9C27B0]">
            {transportIcons[ticket.transportType]}
          </span>

          <span className="text-sm font-medium capitalize">
            {ticket.transportType}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-divider p-3">
            <p className="text-xs text-default-500">Ticket Price</p>

            <h3 className="bg-linear-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-2xl font-bold text-transparent">
              ৳{ticket.price}
            </h3>
          </div>

          <div className="rounded-xl border border-divider p-3">
            <p className="text-xs text-default-500">Available Seats</p>

            <h3 className="text-2xl font-bold">{ticket.quantity}</h3>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-divider p-3">
          <p className="mb-1 text-xs text-default-500">Departure Date</p>

          <p className="font-medium">
            {new Date(ticket.departureDateTime).toLocaleString("en-BD", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>

        <div className="mt-4 flex-1">
          <p className="mb-2 text-xs text-default-500">Included Perks</p>

          <div className="flex flex-wrap gap-2">
            {ticket.perks?.map((perk) => (
              <span
                key={perk}
                className="rounded-full bg-default-100 px-3 py-1 text-xs"
              >
                {perk}
              </span>
            ))}
          </div>
        </div>

        {isRejected && (
          <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
            This ticket was rejected by the admin.
          </div>
        )}

        <div className="mt-auto flex gap-3 pt-5">
          <UpdateTicketModal ticket={ticket} isRejected={isRejected} />
          <DeleteTicketModal ticketId={ticket._id} isRejected={isRejected} />
        </div>
      </div>
    </Card>
  );
};

export default MyAddedCard;
