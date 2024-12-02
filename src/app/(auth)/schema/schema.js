import { z } from "zod";

const schema = z.string();

export const registerSchema = z.object({
    name: schema.min(2, "Name must be at least 2 characters"),
    email: schema.email("Invalid email").toLowerCase(),
    password: schema.min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
    email: schema.email("Invalid email").toLowerCase(),
    password: schema.min(8, "Password must be at least 8 characters"),
});
