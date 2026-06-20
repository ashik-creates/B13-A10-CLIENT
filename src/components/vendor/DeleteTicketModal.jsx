"use client";

import { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { deleteTicket } from "@/lib/action/ticket";
import { useRouter } from "next/navigation";

const DeleteTicketModal = ({ ticketId, isRejected }) => {
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteTicket(ticketId);

    setLoading(false);

    if (res.deletedCount > 0) {
      toast.success("Ticket deleted successfully");
      setOpen(false);
      router.refresh();
    } else {
      toast.error(res.message || "Failed to delete the ticket");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        className="flex-1 rounded-md"
        variant="outline"
        isDisabled={isRejected}
      >
        Delete
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Delete Ticket</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <p className="text-default-600">
                Are you sure you want to delete this ticket? This action cannot
                be undone.
              </p>

              <Modal.Footer className="px-0">
                <Button variant="light" onPress={() => setOpen(false)}>
                  Cancel
                </Button>

                <Button
                  variant="danger"
                  isLoading={loading}
                  onPress={handleDelete}
                >
                  Delete Permanently
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default DeleteTicketModal;
