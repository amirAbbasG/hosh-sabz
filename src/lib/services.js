import { SSE } from "sse";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const loginApi = async ({ username, password }) => {
  const res = await fetch(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify({
      uname: username,
      pass: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const fetchData = async (ticket) => {
  const res = await fetch(`${baseUrl}/getData`, {
    headers: {
      Authorization: `Bearer ${ticket}`,
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const fetchCode = async () => {
  let source = new SSE(`${baseUrl}/getCode`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("ticket")}`,
    },
    method: "POST",
    payload: JSON.stringify({
      message: "Write me a chrome extension code",
    }),
  });

  return source;
};
