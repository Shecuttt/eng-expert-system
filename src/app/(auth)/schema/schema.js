import { z } from "zod";

const schema = z.string();

export const registerSchema = z.object({
    name: schema
        .min(2, "Name must be at least 2 characters")
        .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces"),
    email: schema.email("Invalid email").toLowerCase(),
    password: schema
        .min(8, "Password must be at least 8 characters")
        .regex(
            /(?=.*[a-z])/,
            "Password must contain at least one lowercase letter"
        )
        .regex(
            /(?=.*[A-Z])/,
            "Password must contain at least one uppercase letter"
        )
        .regex(/(?=.*[0-9])/, "Password must contain at least one number")
        .regex(
            /(?=.*[!@#$%^&*])/,
            "Password must contain at least one special character"
        ),
});

export const loginSchema = z.object({
    email: schema.email("Invalid email").toLowerCase(),
    password: schema.min(8, "Password must be at least 8 characters"),
});
