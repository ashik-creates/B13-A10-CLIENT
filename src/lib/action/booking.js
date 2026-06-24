"use server";

import { getToken } from "../getToken";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const bookTicket = async (bookingData) => {
  const token = await getToken();
  const res = await fetch(`${baseURL}/api/user/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  const data = await res.json();

  return data;
};


export const updateBookingStatus = async (bookingId, status) => {
  const token = await getToken();
  const res = await fetch(`${baseURL}/api/vendor/bookings/${bookingId}/status`, {
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
