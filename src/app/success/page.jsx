import Link from "next/link";
import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";
import { createPayment } from "@/lib/action/payment";
import { FaCheckCircle } from "react-icons/fa";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error(
      "Please provide a valid session_id (`cs_test_...`)"
    );
  }

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const paymentInfo = {
      sessionId: session_id,
      bookingId: metadata.bookingId,
      userId: metadata.userId,
      ticketName: metadata.ticketName,
      totalAmount: metadata.totalAmount,
      quantity: metadata.quantity,
    };

    await createPayment(paymentInfo);

    return (
      <section className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-5">
        <div className="w-full max-w-2xl rounded-3xl border border-divider bg-content1 p-10 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <FaCheckCircle className="mb-6 text-7xl text-success" />

            <h1 className="mb-3 text-4xl font-bold">
              Payment Successful 🎉
            </h1>

            <p className="mb-8 text-default-500">
              Thank you for your purchase. Your ticket has been
              booked successfully.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl bg-default-100 p-6">
            <div className="flex justify-between">
              <span className="text-default-500">Ticket</span>
              <span className="font-semibold">
                {metadata.ticketName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-default-500">Quantity</span>
              <span className="font-semibold">
                {metadata.quantity}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-default-500">Total Paid</span>
              <span className="font-semibold text-primary">
                ৳{metadata.totalAmount}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-default-500">Confirmation Email</span>
              <span className="font-semibold">
                {customerEmail}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">

            <Link
              href="/"
              className="rounded-md bg-linear-to-r from-[#9C27B0] to-[#E91E63] border border-divider px-6 py-3 text-center font-medium transition hover:bg-default-100"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }
}