"use server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const subscription = async (data) => {
  const res = await fetch(`${baseUrl}/subscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  return resData;
};