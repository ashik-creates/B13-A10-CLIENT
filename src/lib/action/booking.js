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