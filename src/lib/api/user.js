const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllUsers = async () => {
  const res = await fetch(`${baseURL}/api/admin/users`);
  const data = await res.json();
  return data;
};