import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const history = await prisma.history.findMany({
            orderBy: {
                // sorting by creation time descending
                createdAt: "desc",
            },
        });

        return new Response(JSON.stringify(history), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ err: "Failed to fetch history" }),
            { status: 500 }
        );
    }
}
