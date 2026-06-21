"use client";

import { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { HiExclamationTriangle } from "react-icons/hi2";
import { updateUserFraudStatus } from "@/lib/action/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FraudAlertModal = ({ user }) => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const handleFraudStatusChange = async () => {
    const res = await updateUserFraudStatus(user._id, true);
    if (res.modifiedCount > 0) {
      toast.success("User marked as fraud successfully");
      setOpen(false);
      router.refresh();
    } else {
      toast.error("Failed to mark user as fraud");
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <Button
        size="sm"
        variant="danger"
        onPress={() => setOpen(true)}
        isDisabled={user.isFraud}
      >
        <HiExclamationTriangle size={16} />
        {user.isFraud
          ? "Marked Fraud"
          : "Mark as Fraud"}
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="max-w-md rounded-3xl border border-danger/20 bg-content1">
            <Modal.CloseTrigger />

            <Modal.Header>
              <div className="mx-auto flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
                  <HiExclamationTriangle
                    size={32}
                    className="text-danger"
                  />
                </div>

                <Modal.Heading className="text-2xl font-bold">
                  Mark Vendor as Fraud?
                </Modal.Heading>
              </div>
            </Modal.Header>

            <Modal.Body>
              <div className="space-y-4 text-center">
                <p className="text-default-600">
                  You are about to mark{" "}
                  <span className="font-semibold">
                    {user.name}
                  </span>{" "}
                  as a fraudulent vendor.
                </p>

                <div className="rounded-2xl border border-danger/20 bg-danger/5 p-4 text-sm text-default-600">
                  This action will:
                  <ul className="mt-3 space-y-2 text-left">
                    <li>
                      • Hide all tickets added by this
                      vendor
                    </li>

                    <li>
                      • Prevent the vendor from adding
                      future tickets
                    </li>

                    <li>
                      • Flag the account as fraudulent
                    </li>
                  </ul>
                </div>

                <p className="text-sm font-medium text-danger">
                  This action cannot be easily undone.
                </p>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="light"
                onPress={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                color="danger"
                onPress={handleFraudStatusChange}
                className="bg-linear-to-r from-rose-500 to-red-600 text-white"
              >
                Yes, Mark as Fraud
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default FraudAlertModal;