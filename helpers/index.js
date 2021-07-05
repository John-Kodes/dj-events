import cookie from "cookie";

export const parseCookies = (req) => {
  // if a req is passed in then we pass in the cookie that is to be parsed. If that cookie doesnt exist, we will pass in an empty string. Also if a req isnt passed in
  return cookie.parse(req ? req.headers.cookie || "" : "");
};
