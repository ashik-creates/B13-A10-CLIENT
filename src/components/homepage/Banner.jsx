"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function Banner() {
  const [activeTab, setActiveTab] = useState("bus");

  const transportTypes = [
    {
      id: "bus",
      label: "Reliable Bus Routes",
      icon: FaBus,
      count: "140+ Operators",
    },
    {
      id: "train",
      label: "Intercity Trains",
      icon: FaTrain,
      count: "52 Routes",
    },
    {
      id: "flight",
      label: "Domestic Flights",
      icon: FaPlane,
      count: "4 Airlines",
    },
    {
      id: "launch",
      label: "River Launches",
      icon: FaShip,
      count: "28 Vessels",
    },
  ];

  return (
    <section className="relative w-full bg-background overflow-hidden py-10 lg:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[#FF3B30]/10 blur-[150px] dark:bg-[#FF3B30]/5" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#00D2FF]/10 blur-[150px] dark:bg-[#00D2FF]/5" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="text-left lg:col-span-6 max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-divider/60 bg-content1 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#FF3B30] animate-pulse" />
              Digital Travel Hub of Bangladesh
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
              Your Ticket to Every Destination,{" "}
              <span className="bg-linear-to-r from-[#FF3B30] via-[#9C27B0] to-[#00D2FF] bg-clip-text text-transparent">
                Made Effortless
              </span>
            </h1>

            <p className="mt-6 text-base text-muted-foreground sm:text-lg leading-relaxed">
              Skip the counter lines completely. Instantly browse fixed
              schedules, real-time seat maps, and secure digital tickets across
              our verified network.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={"/tickets"}>
                <Button
                  className="h-12 rounded-md px-6 text-sm font-semibold text-white bg-linear-to-r from-[#9C27B0] to-[#E91E63] shadow-xl shadow-purple-500/20 active:scale-95 transition-transform"
                  endContent={<FiArrowRight size={16} />}
                >
                  Book Tickets Now
                </Button>
              </Link>

              <Link href={"/tickets"}>
                <Button
                  variant="bordered"
                  className="h-12 px-6 rounded-md text-sm font-medium text-[#0D9488] border-[#0D9488]/30 bg-[#0D9488]/5 hover:bg-[#0D9488]/10 transition-colors"
                >
                  Explore All Routes
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 w-full">
            <div className="grid gap-4 sm:grid-cols-2">
              {transportTypes.map((type) => {
                const Icon = type.icon;
                const isCurrent = activeTab === type.id;
                return (
                  <div
                    key={type.id}
                    onMouseEnter={() => setActiveTab(type.id)}
                    className={`group cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                      isCurrent
                        ? "bg-content1/80 border-divider shadow-xl scale-[1.02]"
                        : "bg-content1/30 border-transparent hover:border-divider/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-colors ${
                          isCurrent
                            ? "bg-background border-divider text-foreground"
                            : "bg-background/50 border-divider/40 text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md transition-colors ${
                          isCurrent
                            ? "bg-background text-foreground border border-divider/50"
                            : "bg-default-100/50 text-muted-foreground"
                        }`}
                      >
                        {type.count}
                      </span>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {type.label}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Instant checkout supported
                        </p>
                      </div>
                      <div
                        className={`h-8 w-8 rounded-lg flex items-center justify-center border border-divider bg-background transition-all ${
                          isCurrent
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      >
                        <FiArrowRight size={14} className="text-foreground" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
