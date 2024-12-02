import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const { id } = params;

        // Cek apakah riwayat milik user yang login
        const history = await prisma.history.findUnique({
            where: { id: parseInt(id) },
        });

        if (!history || history.userId !== userId) {
            return new Response(JSON.stringify({ error: "Not allowed" }), {
                status: 403,
            });
        }

        // Hapus riwayat
        await prisma.history.delete({
            where: { id: parseInt(id) },
        });

        return new Response(
            JSON.stringify({ message: "History deleted successfully" }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to delete history" }),
            { status: 500 }
        );
    }
}
