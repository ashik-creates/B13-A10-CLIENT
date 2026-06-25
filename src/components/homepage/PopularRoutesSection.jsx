import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";

const routes = [
  {
    from: "Dhaka",
    to: "Cox's Bazar",
    price: 6500,
    icon: FaPlane,
  },
  {
    from: "Dhaka",
    to: "Chattogram",
    price: 1200,
    icon: FaTrain,
  },
  {
    from: "Dhaka",
    to: "Sylhet",
    price: 900,
    icon: FaBus,
  },
  {
    from: "Dhaka",
    to: "Barisal",
    price: 1100,
    icon: FaShip,
  },
];

const PopularRoutesSection = () => {
  return (
    <section className="container mx-auto my-16 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold">Popular Routes</h2>

        <p className="mt-2 text-default-500">
          Explore the most popular travel destinations across Bangladesh.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {routes.map((route) => {
          const Icon = route.icon;

          return (
            <Card
              key={`${route.from}-${route.to}`}
              className="border border-divider"
            >
              <div className="space-y-4 p-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4 text-primary">
                    <Icon size={28} />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold">
                    {route.from} → {route.to}
                  </h3>

                  <p className="mt-2 text-default-500">Starting from</p>

                  <p className="text-2xl font-bold text-primary">
                    ৳{route.price}
                  </p>
                </div>

                <Link
                  href="/tickets"
                  className="block text-center bg-linear-to-r from-[#9C27B0] to-[#E91E63] rounded-md px-8 py-3 font-semibold text-white transition hover:opacity-90"
                >
                  Explore Tickets
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default PopularRoutesSection;
