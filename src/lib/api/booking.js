const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getMyBookedTickets = async (userId) => {
  const res = await fetch(`${baseURL}/api/user/bookings/${userId}`);
  const data = await res.json();
  return data;
};

export const getRequestedBookings = async (vendorId) => {
  const res = await fetch(`${baseURL}/api/vendor/bookings/${vendorId}`);

  const data = await res.json();

  return data;
};
