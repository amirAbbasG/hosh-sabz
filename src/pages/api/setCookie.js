import { setTicketCookie } from "@/lib/cookie";

const setCookie = async (req, res) => {
  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);
      const ticket = body.ticket;
      setTicketCookie(ticket, res);
      res.status(200).send({ message: "cookie set done" });
    } catch (error) {
      const err = new Error("set cookie failed: ", error);
      err.statusCode = 500;
      throw err;
    }
  }
};

export default setCookie;
