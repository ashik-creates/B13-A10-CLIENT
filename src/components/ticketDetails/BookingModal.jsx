"use client";

import { useState } from "react";
import {
  Modal,
  Button,
  Input,
  FieldError,
  Description,
  TextField,
  Label,
} from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { bookTicket } from "@/lib/action/booking";
import { useRouter } from "next/navigation";


const BookingModal = ({ ticket, disableBooking }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const totalPrice = Number(quantity) * Number(ticket.price);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (Number(quantity) > Number(ticket.quantity)) {
      toast.error("Booking quantity exceeds available tickets");
      return;
    }

    const booking = {
      ticketId: ticket._id,
      vendorId: ticket.vendorId,
      ticketTitle: ticket.title,
      image: ticket.image,
      from: ticket.from,
      to: ticket.to,
      departureDateTime: ticket.departureDateTime,
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      quantity: Number(quantity),
      totalPrice,
      status: "pending",
      bookedAt: new Date(),
    };

    const resData = await bookTicket(booking);

    setIsLoading(false);

    if (resData.insertedId) {
      toast.success("Ticket booked successfully!");
      setOpen(false);
      router.refresh();
    } else {
      toast.error(resData.message || "Something went wrong!");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <Button
        isDisabled={disableBooking || isLoading}
        onPress={() => setOpen(true)}
        className="w-full bg-linear-to-r from-[#9C27B0] to-[#E91E63] text-white mt-3 rounded-md"
      >
        {isLoading ? "Booking..." : "Book Now"}
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Book Your Ticket</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="rounded-2xl bg-default-100 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-default-500">
                      Available Tickets
                    </span>

                    <span className="font-semibold">{ticket.quantity}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-default-500">
                      Price Per Ticket
                    </span>

                    <span className="font-semibold">৳{ticket.price}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-default-500">
                      Total Price
                    </span>

                    <span className="font-semibold">৳{totalPrice}</span>
                  </div>
                </div>

                <TextField value={quantity} onChange={setQuantity} isRequired>
                  <Label>Ticket Quantity</Label>

                  <Input
                    type="number"
                    min={1}
                    max={ticket.quantity}
                    className="w-full rounded-md border border-divider/50 bg-default-100 px-4 py-3 text-sm text-foreground placeholder:text-default-500 focus:outline-none focus:ring-2 focus:ring-[#9C27B0] focus:ring-offset-2"
                  />

                  <Description>
                    Maximum {ticket.quantity} tickets can be booked.
                  </Description>

                  <FieldError />
                </TextField>

                <Modal.Footer className="px-0 pb-0">
                  <Button variant="light" onPress={() => setOpen(false)}>
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="bg-linear-to-r from-[#9C27B0] to-[#E91E63] text-white"
                  >
                    Confirm Booking
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default BookingModal;
