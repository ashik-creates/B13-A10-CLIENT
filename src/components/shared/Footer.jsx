"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBus } from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {

  const pathname = usePathname()
  if(pathname.includes('dashboard')){
    return null;
  }
  return (
    <footer className="border-t border-divider/50 bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-[#00D2FF] via-[#9C27B0] to-[#FF3B30] p-[1.5px]">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-background">
                  <span className="font-serif text-base font-black tracking-tighter text-foreground"><FaBus /></span>
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold tracking-tight text-foreground">
                ticket<span className="font-sans font-light text-muted-foreground">bari</span>
              </h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Book bus, train, launch and flight tickets with ease through one modern travel platform.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3 text-sm font-medium text-muted-foreground">
              <Link href="/" className="transition hover:text-foreground">Home</Link>
              <Link href="/tickets" className="transition hover:text-foreground">All Tickets</Link>
              <Link href="/about" className="transition hover:text-foreground">About</Link>
              <Link href="/contact" className="transition hover:text-foreground">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h4>

            <div className="space-y-3 text-sm font-medium text-muted-foreground">
              <p className="transition hover:text-foreground cursor-pointer">support@ticketbari.com</p>
              <p>+880 1234 567890</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
              Follow Us
            </h4>

            <div className="flex gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-md border border-divider bg-content1 text-muted-foreground transition hover:text-white hover:bg-linear-to-r hover:from-[#00D2FF] hover:to-[#9C27B0] hover:border-transparent">
                <FaFacebookF size={14} />
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-md border border-divider bg-content1 text-muted-foreground transition hover:text-white hover:bg-linear-to-r hover:from-[#00D2FF] hover:to-[#9C27B0] hover:border-transparent">
                <FaInstagram size={14} />
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-md border border-divider bg-content1 text-muted-foreground transition hover:text-white hover:bg-linear-to-r hover:from-[#00D2FF] hover:to-[#9C27B0] hover:border-transparent">
                <FaLinkedinIn size={14} />
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-md border border-divider bg-content1 text-muted-foreground transition hover:text-white hover:bg-linear-to-r hover:from-[#00D2FF] hover:to-[#9C27B0] hover:border-transparent">
                <FaXTwitter size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-divider/50 pt-8 text-center text-xs font-medium text-muted-foreground">
          © 2026 TicketBari. All rights reserved.
        </div>
      </div>
    </footer>
  );
}