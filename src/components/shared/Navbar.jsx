"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { Avatar, Dropdown, Label, Button } from "@heroui/react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiArrowUpRight } from "react-icons/fi";
import { FaBus } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();

  if (pathname.includes("dashboard")) {
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
  };

  if (isPending) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-divider/50 bg-background/60 px-4 py-3 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-[#FF3B30] via-[#9C27B0] to-[#00D2FF] p-[1.5px]">
            <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-background">
              <FaBus
                size={15}
                className="text-foreground transition-transform group-hover:scale-110"
              />
            </div>
          </div>

          <h1 className="font-serif text-xl font-bold tracking-tight text-foreground">
            ticket
            <span className="font-sans font-light text-muted-foreground">
              bari
            </span>
          </h1>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/tickets">All Tickets</NavLink>
          </li>

          <li>
            <NavLink href={`/dashboard/${user?.role}`}>Dashboard</NavLink>
          </li>
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />

          {!user ? (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="light"
                  className="h-9 rounded-md border border-transparent px-4 text-sm font-medium text-muted-foreground"
                >
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  className="h-9 rounded-md bg-linear-to-r from-[#9C27B0] to-[#E91E63] px-5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-transform active:scale-95"
                  endContent={<FiArrowUpRight size={15} />}
                >
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Dropdown>
              <Dropdown.Trigger className="flex items-center gap-3 rounded-xl border border-divider px-3 py-2 transition hover:bg-default-100">
                <Avatar size="sm">
                  <Avatar.Image src={user?.image} alt={user?.name} />
                  <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                </Avatar>

                <span className="max-w-32 truncate text-sm font-medium">
                  {user?.name}
                </span>
              </Dropdown.Trigger>

              <Dropdown.Popover className="max-w-72 w-full mr-2 border border-divider bg-content1">
                <div className="border-b border-divider px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <Avatar.Image src={user?.image} alt={user?.name} />
                      <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                    </Avatar>

                    <div>
                      <h4 className="text-sm font-semibold">{user?.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <Dropdown.Menu>
                  <Dropdown.Item id="profile">
                    <Link href={`/dashboard/${user?.role}`} className="flex items-center gap-3">
                      <CgProfile size={18} />
                      <Label>My Profile</Label>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="logout"
                    variant="danger"
                    onClick={handleSignOut}
                  >
                    <div className="flex items-center gap-3">
                      <BiLogOut size={18} />
                      <Label>Logout</Label>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>

        <Button
          isIconOnly
          variant="light"
          radius="md"
          className="min-w-0 text-foreground lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiXMark size={24} /> : <HiBars3 size={24} />}
        </Button>
      </nav>

      {isMenuOpen && (
        <div className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-xl border border-divider bg-background shadow-2xl lg:hidden">
          <ul className="flex flex-col gap-1 p-3">
            <li>
              <NavLink mobile href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                mobile
                href="/tickets"
                onClick={() => setIsMenuOpen(false)}
              >
                All Tickets
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  mobile
                  href={`/dashboard/${user?.role}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            <div className="mt-2 border-t border-divider px-2 pb-2 pt-3">
              <div className="mb-3">
                <ThemeToggle />
              </div>

              {user ? (
                <div className="flex flex-col gap-2">
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="bordered" className="w-full">
                      My Profile
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="bordered" className="w-full">
                      Login
                    </Button>
                  </Link>

                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-linear-to-r from-[#9C27B0] to-[#E91E63] text-white">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
