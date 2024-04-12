import jwt from 'jsonwebtoken';

export class JwtService {
  static async getUserIdByToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || '') as {
        adminId: number;
        iat: number;
        exp: number;
      };
    } catch (error) {
      return null;
    }
  }

  static async createRefreshTokenJWT(userId: number) {
    return jwt.sign({ userId }, process.env.JWT_SECRET || '', {
      expiresIn: '3h',
    });
  }
}
