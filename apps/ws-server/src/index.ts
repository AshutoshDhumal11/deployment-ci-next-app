import { RawData, WebSocketServer } from "ws";
import { prisma } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
    socket.on("error", console.error);

    socket.on("message", async (data: RawData) => {
        let message: string;
        if (typeof data === "string") {
            message = data;
        } else {
            message = data.toString();
        }

        try {
            const parsedMessage = JSON.parse(message);

            await prisma.user.create({
                data: {
                    username: parsedMessage.username,
                    password: parsedMessage.password,
                },
            });
        } catch (error) {
            console.log("Invalid credentials!");
        }
    });

    socket.send("Welcome, you are connected to the ws server!");
});
