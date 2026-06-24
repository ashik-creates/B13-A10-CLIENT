import Link from "next/link";
import { FaCompass } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <FaCompass className="text-6xl text-primary" />
          </div>
        </div>

        <h1 className="mb-4 text-7xl font-bold">404</h1>

        <h2 className="mb-4 text-3xl font-bold">
          Oops! Page Not Found
        </h2>

        <p className="mb-8 text-default-500">
          The page you are looking for might have been removed,
          renamed, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="inline-flex  bg-linear-to-r from-[#9C27B0] to-[#E91E63] rounded-md px-8 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}