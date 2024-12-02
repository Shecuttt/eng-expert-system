import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req) {
    // Check if token is valid
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    try {
        // decode token to get userId
        const decoded = verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // GET history by userId
        const history = await prisma.history.findMany({
            where: {
                userId,
            },
            orderBy: {
                // sorting by creation time descending
                createdAt: "desc",
            },
        });

        return new Response(JSON.stringify(history), { status: 200 });
    } catch (err) {
        return new Response(
            JSON.stringify({ err: "Failed to fetch history" }),
            { status: 500 }
        );
    }
}

export async function POST(req) {
    // Check if token is valid
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    try {
        // decode the token to get userId
        const decoded = verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Create new history entry
        const { action } = await req.json();

        if (!action) {
            // handling null action
            return new Response(
                JSON.stringify({ error: "Action is required" }),
                { status: 400 }
            );
        }

        // add new history entry
        const newHistory = await prisma.history.create({
            data: {
                userId,
                action,
            },
        });

        return new Response(JSON.stringify(newHistory), { status: 201 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to create history" }),
            { status: 500 }
        );
    }
}
