import { getToken } from "../getToken";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllUsers = async () => {
  const token = await getToken();
  const res = await fetch(`${baseURL}/api/admin/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
