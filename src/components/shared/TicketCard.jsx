import Image from "next/image";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import {
  FaBus,
  FaTrain,
  FaPlane,
  FaShip,
  FaArrowRight,
} from "react-icons/fa";

const icons = {
  bus: FaBus,
  train: FaTrain,
  plane: FaPlane,
  ship: FaShip,
};

const TicketCard = ({ ticket }) => {
  const Icon = icons[ticket.transportType];

  return (
    <Card className="overflow-hidden border border-divider bg-content1">
      <div className="relative h-48">
        <Image
          src={ticket.image}
          alt={ticket.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

        <div className="absolute left-5 top-5">
          <div className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 text-white backdrop-blur-md">
            <Icon size={15} />
            <span className="text-sm capitalize">
              {ticket.transportType}
            </span>
          </div>
        </div>

        <div className="absolute bottom-5 left-5">
          <h2 className="text-2xl font-bold text-white">
            {ticket.title}
          </h2>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-default-500">
              From
            </p>
            <h3 className="font-semibold">{ticket.from}</h3>
          </div>

          <FaArrowRight className="text-default-400" />

          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-default-500">
              To
            </p>
            <h3 className="font-semibold">{ticket.to}</h3>
          </div>
        </div>

        <div className="my-5 h-px bg-divider" />

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-default-500">
              Starting From
            </p>

            <h3 className="bg-linear-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-3xl font-bold text-transparent">
              ৳{ticket.price}
            </h3>
          </div>

          <div className="text-right">
            <p className="text-xs text-default-500">
              Available
            </p>

            <p className="font-semibold">
              {ticket.quantity} Seats
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {ticket.perks?.map((perk) => (
            <span
              key={perk}
              className="rounded-full border border-divider px-3 py-1 text-xs"
            >
              {perk}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-default-500">
              Departure
            </p>

            <p className="text-sm font-medium">
              {new Date(
                ticket.departureDateTime
              ).toLocaleString()}
            </p>
          </div>

          <Link href={`/tickets/${ticket._id}`}>
            <Button className="bg-linear-to-r from-[#9C27B0] to-[#E91E63] rounded-md text-white">
              See Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default TicketCard;