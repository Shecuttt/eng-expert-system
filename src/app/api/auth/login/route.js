import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (
            !email ||
            !password ||
            email === undefined ||
            password === undefined
        ) {
            return new Response(
                JSON.stringify({
                    error: "Email and Password must be provided",
                }),
                {
                    status: 400,
                }
            );
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return new Response(
                JSON.stringify({
                    error: "User not found, please register first",
                }),
                {
                    status: 404,
                }
            );
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return new Response(JSON.stringify({ error: "Invalid password" }), {
                status: 401,
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.name,
            },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );
        return new Response(
            JSON.stringify({
                message: "Login success",
                token,
                role: user.role,
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: "Login error" }), {
            status: 500,
        });
    }
}
