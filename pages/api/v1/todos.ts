import { todoControllerDB } from "@ui/controller/db/todos";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const todos = todoControllerDB.get();
    return res.status(200).json({ todos });
  }
  res.status(405).json({
    message: "Method not allowed",
  });
}

export default handler;
