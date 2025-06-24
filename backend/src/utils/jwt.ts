import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateToken = (payload: JwtPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '180d' });
    return token;
}