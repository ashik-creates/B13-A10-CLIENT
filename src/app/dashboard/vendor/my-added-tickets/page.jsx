import MyAddedCard from "@/components/vendor/MyAddedCard";
import { getMyTicket } from "@/lib/api/ticket";
import { getUserSession } from "@/lib/getSession";
import { Chip } from "@heroui/react";

const MyAddedTicketPage = async () => {
  const user = await getUserSession();

  if (user?.isFraud) {
    return (
      <div className="my-10 px-4 lg:px-6">
        <div className="rounded-3xl border border-danger/30 bg-danger/10 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-danger">
                ⚠️ Fraud Account Detected
              </h2>

              <p className="mt-1 text-danger/80">
                Your vendor account has been marked as fraudulent. You no longer
                have access to your added tickets.
              </p>
            </div>

            <Chip color="danger" variant="flat" size="lg">
              Fraud Vendor
            </Chip>
          </div>
        </div>
      </div>
    );
  }

  const tickets = await getMyTicket(user?.id);

  return (
    <div className="my-10 px-4 lg:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Added Tickets</h1>

        <p className="mt-2 text-default-500">
          Manage and review all tickets you have added.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <MyAddedCard key={ticket._id} ticket={ticket} />
          ))
        ) : (
          <div className="col-span-full rounded-3xl border border-divider bg-content1 p-10 text-center">
            <h3 className="text-xl font-semibold">
              No Tickets Added Yet
            </h3>

            <p className="mt-2 text-default-500">
              You have not added any tickets yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAddedTicketPage;