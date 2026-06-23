"use client";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const VendorRevenueOverview = ({ stats }) => {
  const data = [
    {
      name: "Added",
      value: stats.totalTickets,
    },
    {
      name: "Sold",
      value: stats.totalSold,
    },
    {
      name: "Revenue",
      value: stats.totalRevenue,
    },
  ];

  return (
    <div className="rounded-3xl border border-divider bg-content1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Revenue Overview</h2>

        <p className="text-sm text-default-500">
          Monitor your ticket sales and earnings.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-content2 p-5">
          <p className="text-sm text-default-500">
            Tickets Added
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {stats.totalTickets}
          </h3>
        </div>

        <div className="rounded-2xl bg-content2 p-5">
          <p className="text-sm text-default-500">
            Tickets Sold
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {stats.totalSold}
          </h3>
        </div>

        <div className="rounded-2xl bg-content2 p-5">
          <p className="text-sm text-default-500">
            Revenue Earned
          </p>

          <h3 className="mt-2 text-3xl font-bold text-primary">
            ৳{stats.totalRevenue}
          </h3>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#9C27B0"
              radius={[12, 12, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VendorRevenueOverview;