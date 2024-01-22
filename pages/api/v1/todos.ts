import { todoController } from "@server/controller/todos";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method);
  if (req.method == "GET") {
    const todos = todoController.get();
    return res.status(200).json({ todos });
  }
  res.status(405).json({
    message: "Method not allowed",
  });
}

export default handler;
