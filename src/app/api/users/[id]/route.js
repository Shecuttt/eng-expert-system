import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
    const { id } = params; // Ambil id dari URL

    try {
        // Hapus user dari database
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) }, // Pastikan id bertipe integer
        });

        return new Response(
            JSON.stringify({
                message: "User deleted successfully",
                user: deletedUser,
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to delete user" }),
            { status: 500 }
        );
    }
}

export async function PATCH(req, { params }) {
    const { id } = params; // Ambil id dari URL

    try {
        const body = await req.json(); // Data yang dikirim dari frontend

        // Update data user
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name: body.name || undefined, // Perbarui hanya jika data dikirim
                email: body.email || undefined,
                role: body.role || undefined,
            },
        });

        return new Response(
            JSON.stringify({
                message: "User updated successfully",
                user: updatedUser,
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to update user" }),
            { status: 500 }
        );
    }
}
