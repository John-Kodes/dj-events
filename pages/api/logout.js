import cookie from "cookie";

// This is where we actually login our user with Strapi, where we fetch our token.
export default async (req, res) => {
  if (req.method === "POST") {
    // Destroy cookie. Works by setting the token to an empty string instead of data.jwt, and setting an expires property to a 0 date (its in the past)
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        // check if site is https. BUT if we are in development, it will be set to false
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({ message: "Logout success" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
