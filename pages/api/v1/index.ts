import { NextApiRequest, NextApiResponse } from "next";

function handler(request: NextApiRequest, response: NextApiResponse) {
  response.status(200).json({ message: "Olá Mundo" });
}

export default handler;
