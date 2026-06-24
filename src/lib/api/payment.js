import { getToken } from "../getToken";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getPaymentsByUser = async (userId) => {
  const token = await getToken();
  const res = await fetch(`${baseURL}/api/transactions/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data;
};

export const getTransactionOverview = async (vendorId) => {
  const token = await getToken();
  const res = await fetch(`${baseURL}/api/vendor/stats/${vendorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data;
};
