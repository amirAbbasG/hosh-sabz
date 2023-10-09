import cookie from "cookie";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const setTicketCookie = (ticket, res) => {
  const maxAge = 10 * 24 * 60 * 60;

  const setCookie = cookie.serialize("ticket", ticket, {
    httpOnly: true,
    maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  res.setHeader("Set-Cookie", setCookie);
};

export const removeCookie = (res) => {
  const val = cookie.serialize("ticket", "", {
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", val);
};

export const setCookieApi = async (ticket) => {
  const data = { ticket };
  return await fetch(`${siteUrl}/api/setCookie`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const logoutApi = async () => {
  return await fetch(`${siteUrl}/api/logout`, {
    method: "POST",
  });
};
