"use server";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const bookTicket = async (bookingData) => {
  const res = await fetch(`${baseURL}/api/user/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  const data = await res.json();

  return data;
};

export const getRequestedBookings = async (vendorId) => {
  const res = await fetch(`${baseURL}/api/user/bookings/${vendorId}`);

  const data = await res.json();

  return data;
};

export const updateBookingStatus = async (bookingId, status) => {
  const res = await fetch(`${baseURL}/api/vendor/bookings/${bookingId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();

  return data;
};
