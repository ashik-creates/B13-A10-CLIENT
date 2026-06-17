"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Dropdown, Label, Button } from "@heroui/react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { FaMoon } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiArrowUpRight } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { FaBus } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = null;

  const handleSignOut = () => console.log("logout");

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
          {["Home|/", "All Tickets|/tickets", "Routes|/routes", "Contact|/contact"].map((item) => {
            const [label, href] = item.split("|");
            return (
              <li key={href}>
                <Link href={href} className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-default-100 hover:text-foreground">
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle></ThemeToggle>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button 
                  variant="light"
                  
                  className="h-9 px-4 text-sm font-medium text-muted-foreground  border border-transparent rounded-md"
                >
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button 
                  className="h-9 rounded-md px-5 text-sm font-semibold text-white bg-gradient-to-r from-[#9C27B0] to-[#E91E63] shadow-lg shadow-purple-500/20 active:scale-95 transition-transform"
                  endContent={<FiArrowUpRight size={15} />}
                >
                  Register
                </Button>
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
                      <MdDashboard size={18} /><Label className="text-inherit">Dashboard</Label>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item id="profile" textValue="profile">
                    <Link href="/profile" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                      <CgProfile size={18} /><Label className="text-inherit">Profile</Label>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item id="logout" textValue="logout" variant="danger" onClick={handleSignOut}>
                    <div className="flex items-center gap-3"><BiLogOut size={18} /><Label>Logout</Label></div>
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
          className="lg:hidden text-foreground min-w-0" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiXMark size={24} /> : <HiBars3 size={24} />}
        </Button>
      </nav>

      {isMenuOpen && (
        <div className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-xl border border-divider bg-background shadow-2xl lg:hidden">
          <ul className="flex flex-col p-3 gap-1">
            {["Home|/", "All Tickets|/tickets", "Routes|/routes", "Contact|/contact"].map((item) => {
              const [label, href] = item.split("|");
              return (
                <li key={href}>
                  <Link href={href} className="block rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-default-100 hover:text-foreground">
                    {label}
                  </Link>
                </li>
              );
            })}
            <div className="mt-2 border-t border-divider pt-3 px-2 pb-2 flex flex-col gap-2">
              {user ? (
                <Button radius="md" className="w-full h-10 text-sm font-medium text-foreground bg-default-100 hover:bg-default-200 transition-colors">
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="bordered" className="w-full h-10 text-sm font-medium text-[#0D9488] border-[#0D9488]/30 bg-[#0D9488]/5 hover:bg-[#0D9488]/10 transition-colors">
                    Login
                  </Button>
                  <Button className="w-full rounded-md h-10 text-sm font-semibold text-white bg-gradient-to-r from-[#9C27B0] to-[#E91E63]">
                    Register
                  </Button>
                </>
              )}
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}