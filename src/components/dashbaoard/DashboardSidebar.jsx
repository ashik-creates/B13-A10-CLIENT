"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Drawer, Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import {
  FaBullhorn,
  FaChartColumn,
  FaCircleUser,
  FaClipboardList,
  FaMoneyBillTransfer,
  FaPlus,
  FaTicketSimple,
  FaUsers,
  FaChartPie,
  FaBars,
} from "react-icons/fa6";
import NavLink from "../shared/NavLink";
import { FaBus } from "react-icons/fa";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user;
  const role = currentUser?.role || "user";

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
  };

  const dashboardItems = {
    user: [
      {
        icon: FaCircleUser,
        label: "User Profile",
        link: "/dashboard/user",
      },
      {
        icon: FaTicketSimple,
        label: "My Booked Tickets",
        link: "/dashboard/user/my-booked-tickets",
      },
      {
        icon: FaMoneyBillTransfer,
        label: "Transaction History",
        link: "/dashboard/user/transactions",
      },
    ],
    vendor: [
      {
        icon: FaCircleUser,
        label: "Vendor Profile",
        link: "/dashboard/vendor",
      },
      {
        icon: FaPlus,
        label: "Add Ticket",
        link: "/dashboard/vendor/add-ticket",
      },
      {
        icon: FaTicketSimple,
        label: "My Added Tickets",
        link: "/dashboard/vendor/my-added-tickets",
      },
      {
        icon: FaClipboardList,
        label: "Requested Bookings",
        link: "/dashboard/vendor/bookings",
      },
      {
        icon: FaChartColumn,
        label: "Revenue Overview",
        link: "/dashboard/vendor/revenue-overview",
      },
    ],
    admin: [
      {
        icon: FaCircleUser,
        label: "Admin Profile",
        link: "/dashboard/admin",
      },
      {
        icon: FaTicketSimple,
        label: "Manage Tickets",
        link: "/dashboard/admin/manage-tickets",
      },
      {
        icon: FaUsers,
        label: "Manage Users",
        link: "/dashboard/admin/manage-users",
      },
      {
        icon: FaBullhorn,
        label: "Advertise Tickets",
        link: "/dashboard/admin/advertise-tickets",
      },
    ],
  };

  const navItems = dashboardItems[role] || dashboardItems.user;

  if (isPending) {
    return (
      <div className="h-96 max-w-60 w-full flex justify-center items-center text-sm font-medium">
        <Spinner></Spinner>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          isIconOnly
          className="rounded-xl bg-[#FACC15] text-black shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <FaBars size={18} />
        </Button>
      </div>

      <nav className="hidden h-screen w-64 flex-col gap-5 border-r border-divider bg-background p-6 md:flex justify-between sticky left-0 top-0">
        <div className="flex flex-col gap-5 w-full ">
          <Link href="/" className="flex items-center gap-3 px-2 py-4 border-b border-gray-200">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-[#FF3B30] via-[#9C27B0] to-[#00D2FF] p-[1.5px]">
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-background">
                <span className="text-xs font-bold">
                  <FaBus />
                </span>
              </div>
            </div>

            <h1 className="font-serif text-xl font-bold tracking-tight text-foreground">
              ticket
              <span className="font-sans font-light text-muted-foreground">
                bari
              </span>
            </h1>
          </Link>

          <div className="mt-4 flex flex-col gap-2 w-full">
            {navItems.map((item) => (
              <NavLink key={item.label} href={item.link}>
                <div className="flex items-center gap-3.5 w-full">
                  <item.icon className="size-5 shrink-0" />
                  <span>{item.label}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="w-full pt-4 border-t border-divider">
          <Button
            onClick={handleSignOut}
            variant="flat"
            color="danger"
            className="w-full justify-start gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold h-auto min-w-0"
          >
            <BiLogOut size={18} className="shrink-0" />
            <span>Logout</span>
          </Button>
        </div>
      </nav>

      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="left"
        size="xs"
      >
        <Drawer.Content className="bg-background p-6 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-5 w-full">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="mb-6 flex items-center gap-3 px-2 py-2"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-[#FF3B30] via-[#9C27B0] to-[#00D2FF] p-[1.5px]">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-background">
                  <span className="text-xs font-bold">TB</span>
                </div>
              </div>

              <h1 className="font-serif text-xl font-bold tracking-tight text-foreground">
                ticket
                <span className="font-sans font-light text-muted-foreground">
                  bari
                </span>
              </h1>
            </Link>

            <div className="flex flex-col gap-2 w-full">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.link}
                  mobile
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3.5 w-full">
                    <item.icon className="size-5 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="w-full pt-4 border-t border-divider mt-auto">
            <Button
              onClick={() => {
                handleSignOut();
                setIsOpen(false);
              }}
              variant="flat"
              color="danger"
              className="w-full justify-start gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold h-auto min-w-0"
            >
              <BiLogOut size={18} className="shrink-0" />
              <span>Logout</span>
            </Button>
          </div>
        </Drawer.Content>
      </Drawer>
    </>
  );
};

export default DashboardSidebar;
