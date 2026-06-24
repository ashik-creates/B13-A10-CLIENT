"use client";

import { updateBookingStatus } from "@/lib/action/booking";
import { Table, Button, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RequestedBookingsTable = ({ bookings = [], user }) => {
  const router = useRouter();

  const handleAccept = async (bookingId) => {
    const res = await updateBookingStatus(bookingId, "accepted");

    if (res.modifiedCount > 0) {
      toast.success("Booking accepted successfully");
      router.refresh();
    }
  };

  const handleReject = async (bookingId) => {
    const res = await updateBookingStatus(bookingId, "rejected");

    if (res.modifiedCount > 0) {
      toast.success("Booking rejected successfully");
      router.refresh();
    }
  };

  if (user?.isFraud) {
    return (
      <div className="rounded-3xl border border-danger/30 bg-danger/10 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-danger">
              ⚠️ Fraud Account Detected
            </h2>

            <p className="mt-1 text-danger/80">
              Your vendor account has been marked as fraudulent. You no longer
              have access to booking requests.
            </p>
          </div>

          <Chip color="danger" variant="flat" size="lg">
            Fraud Vendor
          </Chip>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-divider bg-content1 p-5">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">Requested Bookings</h2>

        <p className="text-sm text-default-500">
          Review and manage booking requests for your tickets.
        </p>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Requested bookings table"
            className="min-w-[900px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>User</Table.Column>
              <Table.Column>Ticket Title</Table.Column>
              <Table.Column>Quantity</Table.Column>
              <Table.Column>Total Price</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              <>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <Table.Row key={booking._id}>
                      <Table.Cell>
                        <h4 className="font-semibold">
                          {booking.userName}
                        </h4>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="font-medium">
                          {booking.ticketTitle}
                        </span>
                      </Table.Cell>

                      <Table.Cell>{booking.quantity}</Table.Cell>

                      <Table.Cell>
                        <span className="font-semibold text-[#9C27B0]">
                          ৳{booking.totalPrice}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        <Chip
                          color={
                            booking.status === "accepted"
                              ? "success"
                              : booking.status === "rejected"
                                ? "danger"
                                : booking.status === "paid"
                                  ? "secondary"
                                  : "warning"
                          }
                          variant="flat"
                          className="capitalize"
                        >
                          {booking.status}
                        </Chip>
                      </Table.Cell>

                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() =>
                              handleAccept(booking._id)
                            }
                            size="sm"
                            className="bg-linear-to-r from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-500/20"
                            isDisabled={
                              booking.status === "accepted" ||
                              booking.status === "paid"
                            }
                          >
                            Accept
                          </Button>

                          <Button
                            onClick={() =>
                              handleReject(booking._id)
                            }
                            size="sm"
                            className="bg-linear-to-r from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/20"
                            isDisabled={
                              booking.status === "rejected" ||
                              booking.status === "paid"
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell>No bookings found</Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                )}
              </>
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer>
          <div className="px-4 py-2 text-sm text-default-500">
            Total Requests: {bookings.length}
          </div>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default RequestedBookingsTable;