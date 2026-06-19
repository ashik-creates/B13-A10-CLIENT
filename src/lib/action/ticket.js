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