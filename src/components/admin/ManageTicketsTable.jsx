"use client";

import { updateTicketStatus } from "@/lib/action/ticket";
import { Table, Chip, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";
import { HiCheck, HiXMark } from "react-icons/hi2";

const transportIcons = {
  bus: FaBus,
  train: FaTrain,
  plane: FaPlane,
  ship: FaShip,
};

const statusColor = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

const ManageTicketsTable = ({ tickets = [] }) => {
  const router = useRouter();
  const handleApprove = async (ticketId) => {
    const res = await updateTicketStatus(ticketId, "approved");
    if (res.modifiedCount > 0) {
      toast.success("Ticket approved successfully");
      router.refresh();
    } else {
      toast.error("Failed to approve ticket");
    }
  };

  const handleReject = async (ticketId) => {
    const res = await updateTicketStatus(ticketId, "rejected");
    if (res.modifiedCount > 0) {
      toast.success("Ticket rejected successfully");
      router.refresh();
    } else {
      toast.error("Failed to reject ticket");
    }
  };

  return (
    <div className="rounded-3xl border border-divider bg-content1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Manage Tickets</h2>

        <p className="text-sm text-default-500">
          Review all tickets submitted by vendors.
        </p>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Manage tickets table" className="w-full">
            <Table.Header>
              <Table.Column isRowHeader>Ticket</Table.Column>

              <Table.Column>Route</Table.Column>

              <Table.Column>Transport</Table.Column>

              <Table.Column>Price</Table.Column>

              <Table.Column>Quantity</Table.Column>

              <Table.Column>Departure</Table.Column>

              <Table.Column>Status</Table.Column>

              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              <>
                {tickets.length > 0 ? (
                  tickets.map((ticket) => {
                    const Icon = transportIcons[ticket.transportType];

                    return (
                      <Table.Row key={ticket._id}>
                        <Table.Cell>
                          <h4 className="font-semibold">{ticket.title}</h4>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="font-medium">
                            {ticket.from} → {ticket.to}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <div className="flex items-center gap-2 capitalize">
                            {Icon && <Icon />}
                            {ticket.transportType}
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="font-semibold text-[#9C27B0]">
                            ৳{ticket.price}
                          </span>
                        </Table.Cell>

                        <Table.Cell>{ticket.quantity}</Table.Cell>

                        <Table.Cell>
                          <div className="text-sm">
                            {new Date(
                              ticket.departureDateTime,
                            ).toLocaleDateString()}

                            <div className="text-xs text-default-500">
                              {new Date(
                                ticket.departureDateTime,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <Chip
                            color={statusColor[ticket.status]}
                            variant="flat"
                            className="capitalize"
                          >
                            {ticket.status}
                          </Chip>
                        </Table.Cell>

                        <Table.Cell>
                          <div className="flex flex-col gap-2 xl:flex-row">
                            <Button
                              onClick={() => handleApprove(ticket._id)}
                              size="sm"
                              className="bg-linear-to-r from-emerald-500 to-green-600 text-white"
                              isDisabled={ticket.status === "approved"}
                            >
                              <HiCheck size={16} />
                              Approve
                            </Button>

                            <Button
                              onClick={() => handleReject(ticket._id)}
                              size="sm"
                              className="bg-linear-to-r from-rose-500 to-red-600 text-white"
                              isDisabled={ticket.status === "rejected"}
                            >
                              <HiXMark size={16} />
                              Reject
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                ) : (
                  <Table.Row>
                    <Table.Cell>No tickets found</Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
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
            Total Tickets: {tickets.length}
          </div>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default ManageTicketsTable;
