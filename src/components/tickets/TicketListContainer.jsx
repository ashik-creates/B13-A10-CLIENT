"use client";
import { Pagination } from "@heroui/react";
import TicketCard from "../shared/TicketCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TicketListContainer = ({ tickets, filters, total }) => {
  const [page, setPage] = useState(parseInt(filters.page) || 1);

  const router = useRouter();

  const totalItems = total;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (page > 3) pages.push("ellipsis");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (page < totalPages - 2) pages.push("ellipsis");

    if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);

    return pages;
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  const { from, to, transport, sort } = filters;

  useEffect(() => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (transport && transport !== "all") params.set("transport", transport);
    if (sort && sort !== "all") params.set("sort", sort);
    params.set("page", page);

    router.push(`/tickets?${params.toString()}`);
  }, [page, from, to, transport, sort, router]);

  return (
    <div >
      <div className="container mx-auto mb-6 text-sm text-zinc-500">
        Showing {tickets.length} ticket{tickets.length !== 1 && "s"}
      </div>
      <div className="grid grid-cols-3 my-5 gap-5">
        {tickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
        ))}
      </div>
      <Pagination className="w-full">
        <Pagination.Summary>
          Showing {startItem}-{endItem} of {totalItems} results
        </Pagination.Summary>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous
              isDisabled={page === 1}
              onPress={() => setPage((p) => p - 1)}
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
              <Pagination.Item key={`page-${i}`}>
                <Pagination.Link
                  isActive={p === page}
                  onPress={() => setPage(p)}
                >
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ),
          )}
          <Pagination.Item>
            <Pagination.Next
              isDisabled={page === totalPages}
              onPress={() => setPage((p) => p + 1)}
            >
              <span>Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
};

export default TicketListContainer;
