const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getMyTicket = async (vendorId) => {
  const res = await fetch(`${baseURL}/api/vendor/tickets/${vendorId}`);
  const data = await res.json();
  return data;
};
