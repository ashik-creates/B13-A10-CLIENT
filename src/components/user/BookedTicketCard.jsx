"use client"
import Image from "next/image";
import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import {
  FaArrowRight,
  FaClock,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";
import CountdownTimer from "@/components/ticketDetails/CountDownTimer";

const statusStyles = {
  pending: {
    color: "warning",
    text: "Pending Approval",
  },
  accepted: {
    color: "success",
    text: "Accepted",
  },
  rejected: {
    color: "danger",
    text: "Rejected",
  },
  paid: {
    color: "primary",
    text: "Paid",
  },
};

const BookedTicketCard = ({ booking }) => {
  const isExpired = new Date(booking.departureDateTime) <= new Date();

  const canPay = booking.status === "accepted" && !isExpired;

  const showCountdown = booking.status !== "rejected" && !isExpired;

  const handlePayment = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: booking._id,
        ticketName: booking.ticketTitle,
        totalAmount: booking.totalPrice,
        quantity: booking.quantity,
      }),
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-divider bg-content1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative  h-70 overflow-hidden">
        <Image
          src={booking.image}
          alt={booking.ticketTitle}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        <Chip
          color={statusStyles[booking.status]?.color}
          variant="solid"
          className="absolute right-4 top-4 capitalize"
        >
          {statusStyles[booking.status]?.text}
        </Chip>

        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{booking.ticketTitle}</h3>

          <div className="mt-1 flex items-center gap-2 text-sm text-white/80">
            <FaMapMarkerAlt />
            <span>
              {booking.from} → {booking.to}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-default-100 p-4">
          <div>
            <p className="text-xs uppercase text-default-500">Quantity</p>

            <h4 className="mt-1 text-xl font-bold">{booking.quantity}</h4>
          </div>

          <div>
            <p className="text-xs uppercase text-default-500">Total Price</p>

            <h4 className="mt-1 bg-linear-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-xl font-bold text-transparent">
              ৳{booking.totalPrice}
            </h4>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-default-500">Departure</span>

            <span className="text-sm font-semibold">
              {new Date(booking.departureDateTime).toLocaleString()}
            </span>
          </div>

          {showCountdown && (
            <div className="rounded-2xl border border-divider bg-default-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <FaClock className="text-[#9C27B0]" />

                <span className="text-sm font-medium">Departure Countdown</span>
              </div>

              <CountdownTimer departureDateTime={booking.departureDateTime} />
            </div>
          )}

          {booking.status === "rejected" && (
            <div className="rounded-2xl border border-danger/20 bg-danger/10 p-4 text-center text-sm text-danger">
              This booking request was rejected by the vendor.
            </div>
          )}

          {isExpired && booking.status !== "paid" && (
            <div className="rounded-2xl border border-warning/20 bg-warning/10 p-4 text-center text-sm text-warning">
              Departure time has already passed.
            </div>
          )}
        </div>

        <div className="mt-auto pt-6">
          {booking.status === "paid" ? (
            <Button isDisabled className="w-full rounded-xl" color="success">
              Ticket Purchased
            </Button>
          ) : canPay ? (
            <form action="/api/checkout_sessions" method="POST">
              <section>
                <Button
                  onClick={handlePayment}
                  className="w-full rounded-xl bg-linear-to-r from-[#9C27B0] to-[#E91E63] text-white"
                >
                  <FaCreditCard />
                  Pay Now
                </Button>
              </section>
            </form>
          ) : (
            <Link href={`/tickets/${booking.ticketId}`}>
              <Button variant="bordered" className="w-full rounded-xl">
                View Ticket
                <FaArrowRight />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default BookedTicketCard;
