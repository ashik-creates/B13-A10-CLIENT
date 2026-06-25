"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Spinner } from "@heroui/react";
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
  FaBars,
} from "react-icons/fa6";
import NavLink from "../shared/NavLink";
import { FaBus } from "react-icons/fa";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { HiXMark } from "react-icons/hi2";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const currentUser = session?.user;
  const role = currentUser?.role || "user";

  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.refresh();
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
      <div className="flex h-96 w-full max-w-60 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="m-5 md:m-0 ">
        <div className="fixed  p-5 left-4 top-4 md:hidden">
          <Button
            className="flex gap-2  rounded-md bg-background text-foreground"
            onClick={() => setIsOpen(true)}
          >
            <FaBars size={18} />
            Menu
          </Button>
        </div>
      </div>

      <nav className="sticky top-0 hidden h-screen w-64 flex-col justify-between border-r border-divider bg-background p-6 md:flex">
        <div>
          <Link
            href="/"
            className="flex items-center gap-3 border-b border-divider px-2 py-4"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-[#FF3B30] via-[#9C27B0] to-[#00D2FF] p-[1.5px]">
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-background">
                <FaBus />
              </div>
            </div>

            <h1 className="font-serif text-xl font-bold tracking-tight">
              ticket
              <span className="font-sans font-light text-muted-foreground">
                bari
              </span>
            </h1>
          </Link>

          <div className="mt-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink key={item.label} href={item.link}>
                <div className="flex items-center gap-3.5">
                  <item.icon className="size-5 shrink-0" />
                  <span>{item.label}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="border-t border-divider pt-4">
          <Button
            onClick={handleSignOut}
            variant="flat"
            color="danger"
            className="w-full justify-start gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold"
          >
            <BiLogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </nav>

      <div className="md:hidden h-screen">
        <div
          onClick={() => setIsOpen(false)}
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        />

        <aside
          className={`fixed left-0 top-0 z-50 flex h-screen max-w-72 w-full flex-col justify-between border-r border-divider bg-background p-6 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-[#FF3B30] via-[#9C27B0] to-[#00D2FF] p-[1.5px]">
                  <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-background">
                    <FaBus />
                  </div>
                </div>

                <h1 className="font-serif text-xl font-bold tracking-tight">
                  ticket
                  <span className="font-sans font-light text-muted-foreground">
                    bari
                  </span>
                </h1>
              </Link>

              <Button
                isIconOnly
                variant="light"
                onClick={() => setIsOpen(false)}
              >
                <HiXMark size={24} />
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label} onClick={() => setIsOpen(false)}>
                  <NavLink href={item.link} mobile>
                    <div className="flex items-center gap-3.5">
                      <item.icon className="size-5 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-divider pt-4">
            <Button
              onClick={() => {
                handleSignOut();
                setIsOpen(false);
              }}
              variant="flat"
              color="danger"
              className="w-full justify-start gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold"
            >
              <BiLogOut size={18} />
              <span>Logout</span>
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default DashboardSidebar;
