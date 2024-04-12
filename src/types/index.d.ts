export {};

declare global {
  namespace Express {
    export interface Request {
      admin?: { id: number } | null;
    }
  }
}
