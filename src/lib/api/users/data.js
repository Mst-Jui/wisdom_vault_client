import { serverFetch } from "../server";

export const myUsers = async (email) => {
  const result = await serverFetch(`/api/users/${email}`);
  return result;
};

