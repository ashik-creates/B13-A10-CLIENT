"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { FaMoon } from "react-icons/fa6"; 
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiArrowUpRight } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { FaBus } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = null;

  const handleSignOut = () => {
    console.log("logout");
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-3 bg-background/60 backdrop-blur-xl border-b border-divider/50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF3B30] via-[#9C27B0] to-[#00D2FF] p-[1.5px]">
            <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-background">
              <FaBus size={15} className="text-foreground transition-transform group-hover:scale-110" />
            </div>
          </div>
          <h1 className="font-serif text-xl font-bold tracking-tight text-foreground">
            ticket<span className="font-sans font-light text-muted-foreground">bari</span>
          </h1>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          <li>
            <Link
              href="/"
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-default-100 hover:text-foreground"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/tickets"
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-default-100 hover:text-foreground"
            >
              All Tickets
            </Link>
          </li>
          <li>
            <Link
              href="/routes"
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-default-100 hover:text-foreground"
            >
              Routes
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-default-100 hover:text-foreground"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <button className="flex h-9 w-9 items-center justify-center rounded-md border border-divider bg-content1 text-muted-foreground transition hover:text-foreground hover:border-default-400">
            <FaMoon size={13} />
          </button>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <button className="px-4 h-9 text-sm font-medium text-muted-foreground rounded-md transition hover:bg-default-100 hover:text-foreground">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="relative group overflow-hidden h-9 rounded-md px-5 text-sm font-semibold text-white bg-gradient-to-r from-[#FF3B30] to-[#BC00DD] transition-transform active:scale-95">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-1.5">
                    Register <FiArrowUpRight size={15} />
                  </span>
                </button>
              </Link>
            </div>
          ) : (
            <Dropdown>
              <Dropdown.Trigger className="cursor-pointer rounded-full border border-divider p-0.5">
                <Avatar size="sm" radius="sm">
                  <Avatar.Image src={user.image} alt={user.name} />
                  <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>

              <Dropdown.Popover className="w-72 border border-divider bg-content1 text-foreground">
                <div className="border-b border-divider px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar radius="sm">
                      <Avatar.Image src={user.image} alt={user.name} />
                      <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-sm">{user.name}</h4>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </div>

                <Dropdown.Menu>
                  <Dropdown.Item id="dashboard" textValue="dashboard">
                    <Link href="/dashboard" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                      <MdDashboard size={18} />
                      <Label className="text-inherit">Dashboard</Label>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item id="profile" textValue="profile">
                    <Link href="/profile" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                      <CgProfile size={18} />
                      <Label className="text-inherit">Profile</Label>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item id="logout" textValue="logout" variant="danger" onClick={handleSignOut}>
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

        <button
          className="lg:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiXMark size={24} /> : <HiBars3 size={24} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-xl border border-divider bg-background shadow-2xl lg:hidden">
          <ul className="flex flex-col p-3 gap-1">
            <li>
              <Link href="/" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-default-100 hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link href="/tickets" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-default-100 hover:text-foreground">
                All Tickets
              </Link>
            </li>
            <li>
              <Link href="/routes" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-default-100 hover:text-foreground">
                Routes
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-default-100 hover:text-foreground">
                Contact
              </Link>
            </li>

            <div className="mt-2 border-t border-divider pt-3 px-2 pb-2">
              {user ? (
                <button className="w-full h-10 rounded-md text-sm font-medium text-foreground bg-default-100 hover:bg-default-200 transition-colors">
                  Dashboard
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <button className="w-full h-10 rounded-md text-sm font-medium text-muted-foreground hover:bg-default-100 transition-colors">
                    Login
                  </button>
                  <button className="w-full h-10 rounded-md text-sm font-semibold text-white bg-gradient-to-r from-[#FF3B30] to-[#BC00DD]">
                    Register
                  </button>
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}