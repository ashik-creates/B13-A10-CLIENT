"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TextField, InputGroup, Select, ListBox } from "@heroui/react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi2";

const transportLabels = {
  all: "All Transport",
  bus: "Bus",
  train: "Train",
  plane: "Plane",
  ship: "Ship",
};

const sortLabels = {
  all: "Default",
  asc: "Low → High",
  desc: "High → Low",
};

const TicketFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [from, setFrom] = useState(searchParams.get("from") || "");

  const [to, setTo] = useState(searchParams.get("to") || "");

  const [transportType, setTransportType] = useState(
    searchParams.get("transport") || "all",
  );

  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "all");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      if (from) params.set("from", from);
      if (to) params.set("to", to);

      if (transportType !== "all") {
        params.set("transport", transportType);
      }

      if (sortBy !== "all") {
        params.set("sort", sortBy);
      }

      router.push(`/tickets?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [from, to, transportType, sortBy, router]);

  return (
    <div className="mb-10 rounded-[24px] border border-divider bg-content1 p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-3">
          <TextField value={from} onChange={setFrom} className="w-full">
            <span className="mb-2 block text-sm font-medium text-default-500">
              From
            </span>

            <InputGroup className="rounded-xl border border-divider bg-background">
              <InputGroup.Prefix className="pl-4 text-default-400">
                <FaSearch />
              </InputGroup.Prefix>

              <InputGroup.Input placeholder="Dhaka" className="px-3 py-3" />
            </InputGroup>
          </TextField>
        </div>

        <div className="md:col-span-3">
          <TextField value={to} onChange={setTo} className="w-full">
            <span className="mb-2 block text-sm font-medium text-default-500">
              To
            </span>

            <InputGroup className="rounded-xl border border-divider bg-background">
              <InputGroup.Prefix className="pl-4 text-default-400">
                <FaSearch />
              </InputGroup.Prefix>

              <InputGroup.Input
                placeholder="Cox's Bazar"
                className="px-3 py-3"
              />
            </InputGroup>
          </TextField>
        </div>

        <div className="md:col-span-3">
          <span className="mb-2 block text-sm font-medium text-default-500">
            Transport Type
          </span>

          <Select
            selectedKey={transportType}
            onSelectionChange={(key) => setTransportType(key)}
          >
            <Select.Trigger className="flex w-full items-center justify-between rounded-xl border border-divider bg-background px-4 py-3">
              <Select.Value>{transportLabels[transportType]}</Select.Value>

              <Select.Indicator>
                <HiChevronDown />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                <ListBox.Item id="all">All Transport</ListBox.Item>

                <ListBox.Item id="bus">Bus</ListBox.Item>

                <ListBox.Item id="train">Train</ListBox.Item>

                <ListBox.Item id="plane">Plane</ListBox.Item>

                <ListBox.Item id="ship">Ship</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        <div className="md:col-span-3">
          <span className="mb-2 block text-sm font-medium text-default-500">
            Sort By Price
          </span>

          <Select
            selectedKey={sortBy}
            onSelectionChange={(key) => setSortBy(key)}
          >
            <Select.Trigger className="flex w-full items-center justify-between rounded-xl border border-divider bg-background px-4 py-3">
              <Select.Value>{sortLabels[sortBy]}</Select.Value>

              <Select.Indicator>
                <HiChevronDown />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                <ListBox.Item id="all">Default</ListBox.Item>

                <ListBox.Item id="asc">Low → High</ListBox.Item>

                <ListBox.Item id="desc">High → Low</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TicketFilters;
