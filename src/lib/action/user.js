"use server";


const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const updateUserRole = async (userId, role) => {
  const res = await fetch(`${baseURL}/api/admin/users/${userId}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }),
  });

  return res.json();
};