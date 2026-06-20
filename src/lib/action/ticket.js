"use server"

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addTicket = async (ticket) => {
  const res = await fetch(`${baseURl}/api/vendor/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(ticket),
  });

  const data = await res.json();
  return data;
};

export const updateTicket = async (ticketId, ticket) => {
  const res = await fetch(`${baseURl}/api/vendor/tickets/${ticketId}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });

  const data = await res.json();
  return data;
};

export const deleteTicket = async (ticketId) => {
  const res = await fetch(`${baseURl}/api/vendor/tickets/${ticketId}/delete`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
