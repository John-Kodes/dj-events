import cookie from "cookie";
import { API_URL } from "@/config/index";

// This is where we actually login our user with Strapi, where we fetch our token.
export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    // extracting the token by using the npm package cookie and parsing the header's cookie from the request
    const { token } = cookie.parse(req.headers.cookie);

    // Sending the token to Strapi
    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      // Sending the token
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
