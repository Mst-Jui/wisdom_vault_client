
import { authClient } from "../auth-client";
import { baseURL } from "./baseUrl";
import { getUserToken } from "./session";


export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {};
  return header;
}


export const serverMutation = async (path, method, data) => {
  const res = await fetch(`${baseURL}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...await authHeader(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};



export const deleteMutation = async (path) => {
  const res = await fetch(`${baseURL}${path}`, {
    method: "DELETE",
    headers: {
      ...await authHeader(),
    },
  });
  return res.json();
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseURL}${path}`, {
    cache: "no-store",
    headers: {
      ...await authHeader(),
    },
  });
  return res.json();
};


