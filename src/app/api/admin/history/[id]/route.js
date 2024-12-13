import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        await prisma.history.delete({
            where: { id: parseInt(id) },
        });
        return new Response(JSON.stringify({ message: "History deleted" }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete" }), {
            status: 500,
        });
    }
}
