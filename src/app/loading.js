import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-divider bg-content1 p-10 text-center shadow-sm">
        <Spinner
          size="lg"
          color="secondary"
          label="Loading..."
        />

        <h2 className="mt-6 text-2xl font-bold">
          Loading Your Journey...
        </h2>

        <p className="mt-2 text-default-500">
          Please wait while we prepare your tickets and travel information.
        </p>
      </div>
    </div>
  );
}