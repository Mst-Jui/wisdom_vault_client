'use server';

const server_url = process.env.SERVER_URL;

export const serverMutation = async (path, method, data, token) => {
  try {
    const res = await fetch(`${server_url}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      ...(method !== 'GET' ? { body: JSON.stringify(data) } : {}),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};