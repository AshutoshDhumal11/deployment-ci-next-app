import express, { Request, Response } from "express";
import { prisma } from "@repo/db/client";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome!");
});

app.post(
  "/signup",
  async (
    req: Request<{}, {}, { username: string; password: string }, {}>,
    res: Response
  ) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(403).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    try {
      const isUser = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (isUser) {
        return res.status(401).json({
          success: false,
          message: "User is already registered!",
        });
      }

      const user = await prisma.user.create({
        data: {
          username,
          password,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Signed up successful!",
        id: user.id, 
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Signed up failed!",
      });
    }
  }
);

app.listen(3001, () => {
    console.log("Welcome to http-server!")
});
