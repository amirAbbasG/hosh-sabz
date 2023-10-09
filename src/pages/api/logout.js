import { removeCookie } from "@/lib/cookie";

const logout = async (req, res) => {
  if (req.method === "POST") {
    try {
      removeCookie(res);
      res.status(200).send({ done: true });
    } catch (error) {
      const err = new Error("remove cookie failed: ", error);
      err.statusCode = 500;
      throw err;
    }
  }
};

export default logout;
