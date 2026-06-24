"use server"

import { getToken } from "../getToken";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addTicket = async (ticket) => {
  const token = await getToken();
  const res = await fetch(`${baseURl}/api/vendor/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(ticket),
  });

  const data = await res.json();
  return data;
};

export const updateTicket = async (ticketId, ticket) => {
  const token = await getToken();
  const res = await fetch(`${baseURl}/api/vendor/tickets/${ticketId}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ticket),
  });

  const data = await res.json();
  return data;
};

export const deleteTicket = async (ticketId) => {
  const token = await getToken();
  const res = await fetch(`${baseURl}/api/vendor/tickets/${ticketId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const updateTicketStatus = async (ticketId, status) => {
  const token = await getToken();
  const res = await fetch(`${baseURl}/api/admin/tickets/${ticketId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();
  return data;
};

export const updateTicketAdvertise = async (ticketId, isAdvertised) => {
  const token = await getToken();
  const res = await fetch(
    `${baseURl}/api/admin/tickets/${ticketId}/advertise`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isAdvertised }),
    }
  );

  const data = await res.json();
  return data;
};
