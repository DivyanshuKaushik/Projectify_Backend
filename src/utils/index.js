import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export function Response(statusCode,message,data=null){
    return {statusCode,message,data}
}

export async function hash(value) {
    return await bcrypt.hash(value, 12);
}

export async function verifyHash(plain, hashed) {
    return await bcrypt.compare(plain, hashed);
}

export function generateToken(payload) {
    return jwt.sign(payload, "projectify-backend-developed-by-divyanshu-kaushik-jwt-secret", { expiresIn: '5d' });
}

export function verifyToken(token) {
    return jwt.verify(token, "projectify-backend-developed-by-divyanshu-kaushik-jwt-secret");
}