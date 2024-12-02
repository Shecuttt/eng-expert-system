import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { name, email, password, role } = await req.json();

        if (!name || !email || !password) {
            return new Response(
                JSON.stringify({ error: "All fields are required" }),
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });
        return new Response(
            JSON.stringify({
                message: "User registered successfully",
                newUser,
            }),
            {
                status: 201,
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "User registration failed" }),
            {
                status: 500,
            }
        );
    }
}
