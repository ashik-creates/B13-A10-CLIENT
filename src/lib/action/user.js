"use server";

import { getToken } from "../getToken";


const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const updateUserRole = async (userId, role) => {
  const token = await getToken();
  const res = await fetch(`${baseURL}/api/admin/users/${userId}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });

  return res.json();
};

export const updateUserFraudStatus = async (userId, isFraud) => {
  const token = await getToken();
  const res = await fetch(`${baseURL}/api/admin/users/${userId}/fraud`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isFraud }),
  });

  return res.json();
};
