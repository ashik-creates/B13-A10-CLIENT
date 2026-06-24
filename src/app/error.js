"use client";

import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Error({ error, reset }) {
  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-danger/10 p-6">
            <FaExclamationTriangle className="text-6xl text-danger" />
          </div>
        </div>

        <h1 className="mb-4 text-4xl font-bold">
          Something went wrong!
        </h1>

        <p className="mb-2 text-default-500">
          An unexpected error occurred.
        </p>

        <p className="mb-8 text-sm text-danger">
          {error.message}
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