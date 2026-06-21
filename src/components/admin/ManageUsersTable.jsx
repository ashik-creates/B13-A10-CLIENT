"use client";

import { updateUserRole } from "@/lib/action/user";
import { Table, Button, Chip, Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  HiShieldCheck,
  HiBriefcase,
  HiExclamationTriangle,
} from "react-icons/hi2";
import FraudAlertModal from "./FraudAlertModal";

const roleColor = {
  admin: "danger",
  vendor: "secondary",
  user: "default",
};

const ManageUsersTable = ({ users = [] }) => {
  const router = useRouter();
  const handleMakeAdmin = async (userId) => {
    const res = await updateUserRole(userId, "admin");
    if (res.modifiedCount > 0) {
      toast.success("User promoted to admin successfully");
      router.refresh();
    } else {
      toast.error("Failed to promote user");
    }
  };

  const handleMakeVendor = async (userId) => {
    const res = await updateUserRole(userId, "vendor");
    if (res.modifiedCount > 0) {
      toast.success("User promoted to vendor successfully");
      router.refresh();
    } else {
      toast.error("Failed to promote user");
    }
  };

  return (
    <div className="rounded-3xl border border-divider bg-content1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Manage Users</h2>

        <p className="text-sm text-default-500">
          Manage user roles and vendor activities across the platform.
        </p>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Manage users table" className="w-full">
            <Table.Header>
              <Table.Column isRowHeader>User</Table.Column>

              <Table.Column>Email</Table.Column>

              <Table.Column>Role</Table.Column>

              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              <>
                {users.length > 0 ? (
                  users.map((user) => (
                    <Table.Row key={user._id}>
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <Avatar.Image src={user?.image} alt={user?.name} />
                            <Avatar.Fallback>
                              {user?.name?.charAt(0)}
                            </Avatar.Fallback>
                          </Avatar>

                          <div>
                            <h4 className="font-semibold">{user.name}</h4>

                            {user.isFraud && (
                              <span className="text-xs font-medium text-danger">
                                Fraud Vendor
                              </span>
                            )}
                          </div>
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="text-sm">{user.email}</span>
                      </Table.Cell>

                      <Table.Cell>
                        <Chip
                          color={roleColor[user.role]}
                          variant="flat"
                          className="capitalize"
                        >
                          {user.role}
                        </Chip>
                      </Table.Cell>

                      <Table.Cell>
                        <div className="flex flex-col gap-2 xl:flex-row">
                          <Button
                            onClick={() => handleMakeAdmin(user._id)}
                            size="sm"
                            className="bg-linear-to-r from-[#9C27B0] to-[#E91E63] text-white"
                            isDisabled={user.role === "admin"}
                          >
                            <HiShieldCheck size={16} />
                            Make Admin
                          </Button>

                          <Button
                            onClick={() => handleMakeVendor(user._id)}
                            size="sm"
                            className="bg-linear-to-r from-sky-500 to-cyan-600 text-white"
                            isDisabled={user.role === "vendor"}
                          >
                            <HiBriefcase size={16} />
                            Make Vendor
                          </Button>

                          {user.role === "vendor" && (
                            <FraudAlertModal user={user} />
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell>No users found</Table.Cell>
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
            Total Users: {users.length}
          </div>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default ManageUsersTable;
