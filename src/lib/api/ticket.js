import { getToken } from "../getToken";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getMyTicket = async (vendorId) => {
  const token = await getToken();
  const res = await fetch(`${baseURL}/api/vendor/tickets/${vendorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const getAllTicket = async (queryString) => {
  const res = await fetch(`${baseURL}/api/tickets?${queryString}`);
  const data = await res.json();
  return data;
};

export const getAllApprovedTicket = async () => {
  const token = await getToken();
  const res = await fetch(`${baseURL}/api/admin/tickets/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const getSingleTicket = async (ticketId) => {
  const token = await getToken();
  const res = await fetch(`${baseURL}/api/tickets/${ticketId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const getAllTicketsForAdmin = async () => {
  const token = await getToken();
  const res = await fetch(`${baseURL}/api/admin/tickets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const getAdvertisedTickets = async () => {
  const res = await fetch(`${baseURL}/api/tickets/advertised/all`);
  const data = await res.json();
  return data;
};

export const getLatestTickets = async () => {
  const res = await fetch(`${baseURL}/api/tickets/home/latest`, {
    cache: "no-store",
  });

  return res.json();
};
