import { Card } from "@heroui/react";
import {
  FaTicketAlt,
  FaShieldAlt,
  FaBolt,
  FaGlobeAsia,
} from "react-icons/fa";

const features = [
  {
    title: "Easy Booking",
    description:
      "Book your favorite tickets in just a few clicks anytime, anywhere.",
    icon: FaTicketAlt,
  },
  {
    title: "Secure Payments",
    description:
      "Pay confidently with secure Stripe payment integration.",
    icon: FaShieldAlt,
  },
  {
    title: "Instant Confirmation",
    description:
      "Receive instant booking confirmation right after successful payment.",
    icon: FaBolt,
  },
  {
    title: "Multiple Transport Options",
    description:
      "Choose from Bus, Train, Plane, and Ship tickets in one place.",
    icon: FaGlobeAsia,
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="my-16 bg-content2 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">
            Why Choose Ticket Bari?
          </h2>

          <p className="mt-2 text-default-500">
            Experience hassle-free travel booking with trusted services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="border border-divider "
              >
                <div className="flex flex-col items-center p-8 text-center">
                  <div className="mb-5  rounded-full text-blue-500 p-5 text-primary">
                    <Icon size={32} />
                  </div>

                  <h3 className="text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-default-500">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;