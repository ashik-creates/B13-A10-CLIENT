"use client";

import { Pagination } from "@heroui/react";
import TicketCard from "../shared/TicketCard";
import { useRouter } from "next/navigation";

const TicketListContainer = ({ tickets, filters, total }) => {
  const router = useRouter();

  const page = parseInt(filters.page) || 1;

  const totalItems = total;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const { from, to, transport, sort } = filters;

  const changePage = (newPage) => {
    const params = new URLSearchParams();

    if (from) params.set("from", from);
    if (to) params.set("to", to);

    if (transport && transport !== "all") {
      params.set("transport", transport);
    }

    if (sort && sort !== "all") {
      params.set("sort", sort);
    }

    params.set("page", newPage);

    router.push(`/tickets?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (page > 3) pages.push("ellipsis");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) pages.push("ellipsis");

    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <div>
      <div className="container mx-auto mb-6 text-sm text-zinc-500">
        Showing {tickets.length} ticket{tickets.length !== 1 && "s"}
      </div>

      {tickets.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <Pagination className="w-full">
                <Pagination.Summary>
                  Showing {startItem}-{endItem} of {totalItems} results
                </Pagination.Summary>

                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={page === 1}
                      onPress={() => changePage(page - 1)}
                    >
                      <Pagination.PreviousIcon />
                      <span>Previous</span>
                    </Pagination.Previous>
                  </Pagination.Item>

                  {getPageNumbers().map((p, i) =>
                    p === "ellipsis" ? (
                      <Pagination.Item key={`ellipsis-${i}`}>
                        <Pagination.Ellipsis />
                      </Pagination.Item>
                    ) : (
                      <Pagination.Item key={`page-${p}`}>
                        <Pagination.Link
                          isActive={p === page}
                          onPress={() => changePage(p)}
                        >
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    )
                  )}

                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={page === totalPages}
                      onPress={() => changePage(page + 1)}
                    >
                      <span>Next</span>
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-3xl border border-divider bg-content1 p-12 text-center">
          <h3 className="text-2xl font-bold">
            No Tickets Found
          </h3>

          <p className="mt-2 text-default-500">
            No tickets match your current search criteria.
            Try changing the filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
};

export default TicketListContainer;