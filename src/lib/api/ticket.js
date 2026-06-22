const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getMyTicket = async (vendorId) => {
  const res = await fetch(`${baseURL}/api/vendor/tickets/${vendorId}`);
  const data = await res.json();
  return data;
};

export const getAllTicket = async (queryString) => {
  const res = await fetch(`${baseURL}/api/tickets?${queryString}`);
  const data = await res.json();
  return data;
};

export const getSingleTicket = async (ticketId) => {
  const res = await fetch(`${baseURL}/api/tickets/${ticketId}`);
  const data = await res.json();
  return data;
};

export const getAllTicketsForAdmin = async () => {
  const res = await fetch(`${baseURL}/api/admin/tickets`);
  const data = await res.json();
  return data;
}

export const getAdvertisedTickets = async () => {
  const res = await fetch(`${baseURL}/api/tickets/advertised/all`);
  const data = await res.json();
  return data;
}
