import { getToken } from "../getToken";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getMyBookedTickets = async (userId) => {
  const token = await getToken();
  const res = await fetch(`${baseURL}/api/user/bookings/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const getRequestedBookings = async (vendorId) => {
  const token = await getToken();
  const res = await fetch(`${baseURL}/api/vendor/bookings/${vendorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data;
};
