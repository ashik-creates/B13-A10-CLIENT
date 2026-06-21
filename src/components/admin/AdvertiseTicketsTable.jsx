"use client";

import { updateTicketAdvertise } from "@/lib/action/ticket";
import { Table, Chip, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";

const transportIcons = {
  bus: FaBus,
  train: FaTrain,
  plane: FaPlane,
  ship: FaShip,
};

const AdvertiseTicketsTable = ({ tickets = [] }) => {
  const router = useRouter();

  const handleToggleAdvertise = async (ticketId, currentValue) => {
    const res = await updateTicketAdvertise(ticketId, !currentValue);

    if (res.modifiedCount > 0) {
      toast.success(
        !currentValue
          ? "Added to advertisement"
          : "Removed from advertisement"
      );
      router.refresh();
    } else {
      toast.error(res?.message || "Failed to update");
    }
  };

  return (
    <div className="rounded-3xl border border-divider bg-content1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Advertise Tickets</h2>
        <p className="text-sm text-default-500">
          Manage homepage advertisement tickets (max 6).
        </p>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Advertise tickets table" className="w-full">
            <Table.Header>
              <Table.Column isRowHeader>Ticket</Table.Column>
              <Table.Column>Route</Table.Column>
              <Table.Column>Transport</Table.Column>
              <Table.Column>Price</Table.Column>
              <Table.Column>Advertise</Table.Column>
            </Table.Header>

            <Table.Body>
              {tickets.length > 0 ? (
                tickets.map((ticket) => {
                  const Icon = transportIcons[ticket.transportType];

                  return (
                    <Table.Row key={ticket._id}>
                      <Table.Cell>
                        <h4 className="font-semibold">{ticket.title}</h4>
                      </Table.Cell>

                      <Table.Cell className="font-medium">
                        {ticket.from} → {ticket.to}
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

                      <Table.Cell>
                        <Button
                          size="sm"
                          onPress={() =>
                            handleToggleAdvertise(
                              ticket._id,
                              ticket.isAdvertised
                            )
                          }
                          className={
                            ticket.isAdvertised
                              ? "bg-red-500 text-white"
                              : "bg-emerald-500 text-white"
                          }
                        >
                          {ticket.isAdvertised
                            ? "Remove"
                            : "Advertise"}
                        </Button>
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
                </Table.Row>
              )}
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

export default AdvertiseTicketsTable;