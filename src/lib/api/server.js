
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
  // const { data: tokenData } = await authClient.token()
  const res = await fetch(`${baseURL}${path}`, {
    method: "DELETE",
    headers: {
      // authorization: `Bearer ${tokenData?.token}`,
    },
  });
  return res.json();
};

export const serverFetch = async (path) => {
  // const { data: tokenData } = await authClient.token()
  const res = await fetch(`${baseURL}${path}`, {
    cache: "no-store",
    headers: {
      // authorization: `Bearer ${tokenData?.token}`,
    },
  });
  return res.json();
};


