// What's happening here is when url/api/events/[slug] is requested, the function below will run.
// It will filter out the array of events and return the 1 item that meets the conditions.

const { events } = require("./data.json");

export default function handler(req, res) {
  // req.query.slug

  const evt = events.filter((ev) => ev.slug === req.query.slug);

  if (req.method === "GET") {
    res.status(200).json(evt);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
}
